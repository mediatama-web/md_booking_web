<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Daftarkelasm;
use App\Models\Kelasm;

class AlumniController extends Controller
{
    public function index(Request $r){
        // dd($r->cari);
        if($r->cari == null){
            $cari = 2;
        }else{
            $cari = $r->cari;
        }
        $data['kelas'] = Kelasm::get();
        $data['url'] = env('APP_URL');
        $data['alumni'] = Daftarkelasm::leftJoin('pengguna','pengguna.id','daftarkelas.id_user')
                          ->leftJoin('kelas','kelas.id','daftarkelas.id_kelas')
                          ->where('daftarkelas.sertifikat', "1")
                          ->where('daftarkelas.id_kelas',$cari)
                          ->select('pengguna.foto','pengguna.nama_pengguna','kelas.materi','kelas.pertemuan','daftarkelas.id')
                          ->paginate($r->perpage ?? 10);
        return Inertia::render("Homepage/Alumni/Alumni",$data);
    }
}
