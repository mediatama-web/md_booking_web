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

class ApiController extends Controller
{
    // API LOGIN / REGISTER / LOGOUT

    public function login(Request $request)
    {
        if (Auth::guard('api')->attempt(['email' => $request->email, 'password' => $request->password])) {
            $auth = Auth::guard('api')->user();

            $success['token'] = $auth->createToken('auth_token')->plainTextToken;
            $success['id'] = $auth->id;
            $success['nama'] = $auth->nama_pengguna;
            $success['foto'] = "http://192.168.100.214:8000/".$auth->foto;


            return response()->json([
                'success' => true,
                'pesan' => 'Login sukses',
                'data' => $success
            ]);
        } else {
            return response()->json([
                'success' => false,
                'pesan' => 'Cek email dan password lagi',
                'data' => null
            ]);
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
                'foto_mentor' => $a->foto,
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

    public function bookinguser($id){
        $data = Bookingm::where('booking.id_user',$id)->join('mentor','booking.id_mentor','mentor.id')
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

        return response()->json($list);
    }

    public function getkelasuser($id){
        $data = Daftarkelasm::where('daftarkelas.id_user',$id)->leftjoin('kelas','kelas.id','daftarkelas.id_kelas')->get();
        $list = [];
        foreach($data as $i => $a){

            $list[] = array(
                'id_kelas' => (string)$a->id_kelas,
                'materi' => $a->materi,
            );
        }
        

        return response()->json($list);
    }

    public function simpanbooking($id,$jam,$tanggal,$kelas,$mentor,$token){
        $data = Bookingm::create([
            'id_user' => $id,
            'jam' => $jam,
            'tanggal' => $tanggal,
            'id_daftarkelas' => $kelas,
            'id_mentor' => $mentor
        ]);

        if($data){
            $this->notifikasiSend($token, 'Info','Booking Jadwal Berhasil');
            return response()->json([
                'pesan' => true,
            ]);
        }else{
            $this->notifikasiSend($token, 'INFO','Booking Jadwal Ditolak');
            return response()->json([
                'pesan' => false
            ]);
        }
    }

    public function getpertemuan($id){
        $data = Daftarkelasm::where('daftarkelas.id_user',$id)->leftjoin('kelas','kelas.id','daftarkelas.id_kelas')->get();
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

    public function getUser($id){
        $data = Penggunam::where('id',$id)->first();
        $list[] = array(
            'nama_pengguna' => $data->nama_pengguna,
            'no_telpon' => $data->no_telpon,
            'email' => $data->email,
            'foto' => "http://192.168.100.214:8000/".$data->foto,
            'referal' => $data->referal ?? 'tidak terdaftar',
            'alamat' => $data->alamat,
            'tgl_daftar' => $data->tgl_daftar,
        );

        return response()->json($list);
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

    function notifikasiSend($fcmToken, $notificationTitle, $notificationBody){

        $serverKey = 'AAAArhqn0G4:APA91bE8HwHrYEwDDAdCXD5dqEF3ALcodi3lcTEheYmJ1tb3C5iST26qHyF-ju8i7q4xQaO-7ZTVgTPaAV1_22ye7vezmj0CHwYxT_PvY8zKMySivpYW9HplfRE8o3I-JfoNxPFPVkUB'; 
        
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
