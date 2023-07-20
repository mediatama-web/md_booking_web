<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\MemberRequest;
use App\Http\Requests\KelasRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Penggunam;
use App\Models\Kelasm;
use App\Models\Daftarkelasm;

class MemberController extends Controller
{
    public function index(Request $r){
        $data['member'] = Penggunam::search($r->cari)->paginate($r->perpage ?? 10);
        return Inertia::render('Homepage/Member/Member',$data);
    }

    public function add(){

        return inertia::render('Homepage/Member/Create');
    }

    public function simpan(MemberRequest $r){
        if($r->validated()){
            Penggunam::create([
                'nama_pengguna' => $r->nama_pengguna,
                'no_telpon' => $r->no_telpon,
                'alamat' => $r->alamat,
                'email' => $r->email,
                'password' => Hash::make($r->password),
                'tgl_daftar' => date('Y-m-d'),
            ]);
        }


        return Redirect::route('member');
    }

    public function hapusDataMember($id){
        $hapus = Penggunam::where('id',$id)->delete();
        if($hapus){
            Daftarkelasm::where('id_user')->delete();
        }
    }

    public function aktifasiakun($id){
        $cek = Penggunam::where('id',$id)->first();
        if($cek->status_akun == 'aktif'){
            $status = 'belum aktif';
        }else{
            $status = 'aktif';
        }

        Penggunam::where('id',$id)->update(['status_akun' => $status]);

        return Redirect::route('member');
    }

    public function daftarkelas($id){
        $data['kelas'] = Kelasm::get();
        $data['member'] = Penggunam::where('id',$id)->first();
        $data['kelasdaftar'] = Daftarkelasm::join('kelas','kelas.id','daftarkelas.id_kelas')
                                            ->where('daftarkelas.id_user',$id)
                                            ->select('kelas.materi','daftarkelas.id')
                                            ->get();

        return Inertia::render('Homepage/Member/Datakelas',$data);
    }

    public function kelasdaftar(KelasRequest $r){
        if($r->validated()){
            $cek = Daftarkelasm::where('id_user',$r->id_user)->where('id_kelas',$r->id_kelas)->first();
            if($cek){
                return Redirect::back();
            }
            Daftarkelasm::create([
                'id_user' => $r->id_user,
                'id_kelas' => $r->id_kelas,
            ]);
        }

        return Redirect::back();
    }

    public function hapuskelasdaftar($id){
        Daftarkelasm::where('id',$id)->delete();

        return Redirect::back();
    }
}
