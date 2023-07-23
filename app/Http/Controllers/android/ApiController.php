<?php

namespace App\Http\Controllers\android;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
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
        $data = Mentorm::get();
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

    public function simpanbooking(Request $r){
        $data = Bookingm::create([
            'id_user' => $r->id,
            'jam' => $r->jam,
            'tanggal' => $r->tanggal,
            'id_daftarkelas' => $r->kelas,
            'id_mentor' => $r->id_mentor
        ]);

        if($data){
            return response()->json([
                'pesan' => true,
            ]);
        }else{
            return response()->json([
                'pesan' => false
            ]);
        }
    }
}
