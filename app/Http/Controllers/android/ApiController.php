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
use App\Models\Absen;
use App\Models\Loker;
use App\Models\User;

use App\Http\Controllers\NotifikasiController as NotifyWeb;
use App\Http\Controllers\Core\NotifikasiController as NotifyApk;
use App\Http\Controllers\Core\UploadController as Uploadfile;

class ApiController extends Controller
{
    // API LOGIN / REGISTER / LOGOUT

    public function login(Request $request){
        if (Auth::guard('api')->attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::guard('api')->user();

            Penggunam::where('id',$user->id)->update(['fcm_token' => $request->token]);

            return response()->json([
                'success' => true,
                'pesan' => 'Login sukses',
                'token' => $user->createToken('auth_token')->plainTextToken,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'success' => false,
                'pesan' => 'Cek email dan password lagi',
                'token' => null,
                'status' => 400
            ]);
        }
    }

    public function logout(){
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
                'foto_mentor' => $a->foto == '' ? "image/user.png" : $a->foto,
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
                'deskripsi' => ""
            );
        }

        return response()->json([
            'status' => 200,
            'banner' => $list
        ]);
    }

    public function bookinguser(){
        $user = auth('sanctum')->user();
        $data = Bookingm::where('booking.id_user',$user->id)->where('booking.absen','0')
                    ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                    ->select('booking.*','kelas.materi','kelas.jenis')
                    ->get();

        $list = [];
        foreach($data as $i => $a){
            $mentor = Mentorm::where('id',$a->id_mentor)->first();
            if($mentor){
                $nama_mentor = $mentor->nama_mentor;
            }else{
                $nama_mentor = "";
            }
            $list[] = array(
                'id' => (string)$a->id,
                'id_user' => (string)$a->id_user,
                'tanggal' => $a->tanggal,
                'jam' => $a->jam,
                'status' => $a->status,
                'nama_mentor' => $nama_mentor,
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
                'foto' => $a->foto,
                'id_kelas' => (string)$a->id_kelas,
                'materi' => $a->materi,
                'pertemuan' => $a->pertemuan,
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
            'jam' => $r->jam,
            'tanggal' => date("Y-m-d", strtotime($r->tanggal)),
            'id_daftarkelas' => $r->kelas
        ]);

        if($data){
            NotifyApk::notifikasiSend($user->fcm_token, 'Info','Booking Jadwal Berhasil');
            NotifyWeb::sendNotification('NOTICE','Ada Booking Jadwal Hari Ini');
            return response()->json([
                'status' => 200,
                'pesan' => "berhasil",
            ]);
        }else{
            NotifyApk::notifikasiSend($user->fcm_token, 'INFO','Booking Jadwal Ditolak');
            return response()->json([
                'status' => 400,
                'pesan' => "gagal"
            ]);
        }
    }

    public function absen($id){
        $user = auth('sanctum')->user();

        $booking = Bookingm::where('id',$id)->first();
        $jadwal = Absen::create([
            'jam' => date('H:i:s'),
            'tanggal' => date('Y-m-d'),
            'id_user' => $user->id,
            'id_kelas' => $booking->id_daftarkelas
        ]);

        Bookingm::where('id',$id)->update(['absen' => "1"]);

        return response()->json([
            'status' => 200,
            'pesan' => "Berhasil"
        ]);

    }

    public function getpertemuan($id, $status){
        $user = auth('sanctum')->user();
        $data = Bookingm::where('booking.id_user', $user->id)
                    ->where('booking.id_daftarkelas', $id)
                    ->where('booking.status', $status)
                    ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                    ->select('booking.*','kelas.materi','kelas.jenis')
                    ->get();

        $list = [];
        foreach($data as $i => $a){
            $mentor = Mentorm::where('id',$a->id_mentor)->first();
            if($mentor){
                $nama_mentor = $mentor->nama_mentor;
            }else{
                $nama_mentor = "";
            }
            $list[] = array(
                'id' => (string)$a->id,
                'id_user' => (string)$a->id_user,
                'tanggal' => $a->tanggal,
                'jam' => $a->jam,
                'status' => $a->status,
                'nama_mentor' => $nama_mentor,
                'materi' => $a->materi,
                'jenis' => $a->jenis,
            );
        }

        return response()->json([
            'status' => 200,
            'booking' => $list
        ]);
    }

    public function getUser(){
        $user = auth('sanctum')->user();
        $data = Penggunam::where('id',$user->id)->first();

        if(date('H') >= 5 && date('H') <= 11){
            $penanda = "Pagi";
        }elseif(date('H') >= 11 && date('H') <= 16){
            $penanda = "Siang";
        }elseif(date('H') >= 16 && date('H') <= 18){
            $penanda = "Sore";
        }else{
            $penanda = "Malam";
        }

        $list = array(
            'nama_pengguna' => $data->nama_pengguna,
            'no_telpon' => $data->no_telpon,
            'email' => $data->email,
            'foto' => $data->foto,
            'referal' => $data->referal ?? 'tidak terdaftar',
            'alamat' => $data->alamat,
            'tgl_daftar' => $data->tgl_daftar,
            'penanda' => $penanda,
            'cv' => $data->cv,
            'linkedin' => $data->linkedin,
            'status' => 200
        );

        return response()->json($list);
    }

    public function hapusbooking($id){
        $data = Bookingm::where('id',$id)->delete();
        
        return response()->json(['pesan' => $data]);
    }

    public function loker(){
        $data = Loker::get();

        $list = [];
        foreach($data as $a){
            $list[] = array(
                'id' => $a->id,
                'judul' => $a->judul,
                'deskripsi' => $a->deskripsi,
                'tgl_tayang' => $a->tgl_tayang,
                'foto' => $a->foto,
            );
        }

        return response()->json([
            'status' => 200,
            'loker' => $list
        ]);
    }

    public function updateToken(Request $request){
        try{
            $user = auth('sanctum')->user();
            Penggunam::where('id',$user->id)->update(['fcm_token' => $request->token]);
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

    public function uploadCv(Request $request){
        $user = auth('sanctum')->user();
        $foto = $request->file('cv');
        if($foto){
            $filename = Uploadfile::uploadSingle($foto, 'cv/');
            $data['sertifikat'] = $filename;
            $hasil = Penggunam::where('id',$user->id)->update($data);
        }

        return response()->json([
            'success'=>true
        ]);
    }
    
    public function uploadProfile(Request $request){
        $user = auth('sanctum')->user();
        $foto = $request->file('foto');
        if($foto){
            $filename = Uploadfile::uploadSingle($foto, 'profile/');
            $data['foto'] = $filename;
            $hasil = Penggunam::where('id',$user->id)->update($data);
        }

        return response()->json([
            'success'=>true
        ]);
    }
    
    public function uploadLinkedin(Request $request){
        $user = auth('sanctum')->user();
        $data['linkedin'] = $request->linkedin;
        $hasil = Penggunam::where('id',$user->id)->update($data);
        
        return response()->json([
            'success'=>true
        ]);
    }

    public function sertifikat(){
        $user = auth('sanctum')->user();
        $sertifikat = Daftarkelasm::leftjoin('kelas','kelas.id','daftarkelas.id_kelas')
                        ->select('daftarkelas.id','daftarkelas.sertifikat','daftarkelas.tanggal_terbit','kelas.materi','kelas.foto')
                        ->where('daftarkelas.sertifikat','1')
                        ->where('daftarkelas.id_user',$user->id)
                        ->get();

        $list = [];
        foreach($sertifikat as $a){
            $list[] = array(
                'id' => $a->id,
                'kelas' => $a->materi,
                'tanggal_terbit' => $a->tanggal_terbit,
                'foto' => $a->foto,
                'url_depan' => 'sertifikat-depan/'.$user->id.'/'.$a->id_kelas,
                'url_belakang' => 'sertifikat-belakang/'.$user->id.'/'.$a->id_kelas
            );
        }

        return response()->json([
            'status' => 200,
            'sertifikat' => $list
        ]);
    }

}
