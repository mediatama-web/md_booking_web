<?php

namespace App\Http\Controllers\android;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Booking;
use App\Http\Requests\Bookingrequest;
use App\Models\Penggunam;
use App\Models\Mentorm;
use App\Models\Bannerm;
use App\Models\Daftarkelasm;
use App\Models\Bookingm;
use App\Models\Kelasm;

use App\Http\Controllers\NotifikasiController;

class ApiController extends Controller
{
    // API LOGIN / REGISTER / LOGOUT

    public function login(Request $request)
    {
        if (Auth::guard('api')->attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::guard('api')->user();

            Penggunam::where('id',$user->id)->update(['fcm_token' => $request->token]);

            return response()->json([
                'success' => true,
                'pesan' => 'Login sukses',
                'token' => $user->createToken('auth_token')->plainTextToken,
                'status' => 200
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'pesan' => 'Cek email dan password lagi',
                'token' => null,
                'status' => 400
            ], 400);
        }
    }

    public function logout()
    {
        Auth::guard('api')->user()->tokens()->delete();

        return [
            'pesan' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    // API HOME PAGE

    public function mentor(){
        $data = Mentorm::where('status','aktif')->get();
        $list = [];
        foreach($data as $i => $a){
            $list[] = array(
                'id_mentor' => (string)$a->id,
                'nama_mentor' => $a->nama_mentor,
                'bidang' => $a->bidang,
                'foto_mentor' => $a->foto == '' ? "https://jadwalles.idolapppk.com/image/user.png" : $a->foto,
                'email' => $a->email,
                'alamat' => $a->alamat,
                'telepon' => $a->telpon
            );

        }
        return response()->json($list);
    }

    public function banner(){

        $data = Bannerm::get();
        $list = [];
        foreach($data as $i => $a){
            $list[] = array(
                'gambar' => $a->gambar,
            );
        }

        return response()->json($list);
    }

    public function bookinguser(){
        $user = auth('sanctum')->user();
        $data = Bookingm::where('booking.id_user',$user->id)->join('mentor','booking.id_mentor','mentor.id')
                    ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                    ->select('booking.*','mentor.nama_mentor','kelas.materi','kelas.jenis')
                    ->get();

        $list = [];
        foreach($data as $i => $a){
            $list[] = array(
                'id' => (string)$a->id,
                'id_user' => (string)$a->id_user,
                'tanggal' => $a->tanggal,
                'jam' => $a->jam,
                'status' => $a->status,
                'nama_mentor' => $a->nama_mentor,
                'materi' => $a->materi,
                'jenis' => $a->jenis,
            );
        }

        return response()->json([
            'status' => 200,
            'booking' => $list
        ]);
    }

    public function getkelasuser(){
        $user = auth('sanctum')->user();
        $data = Daftarkelasm::where('daftarkelas.id_user',$user->id)->leftjoin('kelas','kelas.id','daftarkelas.id_kelas')->get();
        $list = [];
        foreach($data as $i => $a){

            $list[] = array(
                'id_kelas' => (string)$a->id_kelas,
                'materi' => $a->materi,
            );
        }
               
        return response()->json([
            'status' => 200,
            'kelas' => $list
        ]);
    }

    public function simpanbooking(Request $r){
        $user = auth('sanctum')->user();
        $data = Bookingm::create([
            'id_user' => $user->id,
            'jam' => $jam,
            'tanggal' => $tanggal,
            'id_daftarkelas' => $kelas,
            'id_mentor' => $mentor
        ]);

        if($data){
            $this->notifikasiSend($token, 'Info','Booking Jadwal Berhasil');
            NotifikasiController::sendNotification('NOTICE','Ada Booking Jadwal Hari Ini');
            return response()->json([
                'status' => 200,
                'pesan' => true,
            ]);
        }else{
            $this->notifikasiSend($token, 'INFO','Booking Jadwal Ditolak');
            return response()->json([
                'status' => 400,
                'pesan' => false
            ]);
        }
    }

    public function getpertemuan(){
        $user = auth('sanctum')->user();
        $data = Daftarkelasm::where('daftarkelas.id_user',$user->id)->leftjoin('kelas','kelas.id','daftarkelas.id_kelas')->get();
        $list = [];
        foreach($data as $i => $a){

            $list[] = array(
                'id_kelas' => (string)$a->id_kelas,
                'materi' => $a->materi,
                'jenis' => $a->jenis,
                'total' => (string)0
            );
        }

        return response()->json($list);
    }

    public function getUser(){
        $user = auth('sanctum')->user();
        $data = Penggunam::where('id',$user->id)->first();
        $list = array(
            'nama_pengguna' => $data->nama_pengguna,
            'no_telpon' => $data->no_telpon,
            'email' => $data->email,
            'foto' => $data->foto,
            'referal' => $data->referal ?? 'tidak terdaftar',
            'alamat' => $data->alamat,
            'tgl_daftar' => $data->tgl_daftar,
            'status' => 200
        );

        return response()->json($list);
    }

    public function hapusbooking($id){
        $data = Bookingm::where('id',$id)->delete();
        
        return response()->json(['pesan' => $data]);
    }

    public function updateToken(Request $request){
        try{
            Penggunam::update(['fcm_token'=>$request->token]);
            return response()->json([
                'success'=>true
            ]);
        }catch(\Exception $e){
            report($e);
            return response()->json([
                'success'=>false
            ],500);
        }
    }

    public static function notifikasiSend($fcmToken, $notificationTitle, $notificationBody){
        $SERVER_API_KEY = env('FCM_SERVER_KEY');
        $serverKey = $SERVER_API_KEY; 
        
        $client = new Client();
        $response = $client->post('https://fcm.googleapis.com/fcm/send', [
            'headers' => [
                'Authorization' => 'key='.$serverKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'to' => $fcmToken,
                'notification' => [
                    'title' => $notificationTitle,
                    'body' => $notificationBody,
                ],
            ],
        ]);

        return response()->json('berhasil');
    }

}
