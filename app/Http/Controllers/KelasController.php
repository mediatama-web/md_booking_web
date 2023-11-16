<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kelasm;
use App\Http\Requests\Paketrequest;

use App\Http\Controllers\Core\UploadController as Uploadfile;

class KelasController extends Controller
{
    public function index(Request $r){
        $data['kelas'] = Kelasm::search($r->cari)->paginate($r->perpage ?? 10);
        
        return Inertia::render('Homepage/Kelas/Kelas',$data);
    }

    public function tambah($id = null){
        if($id != null){
            $data['kelas'] = Kelasm::where('id',$id)->first();
        }else{
            $data['kelas'] = 0;
        }
        return Inertia::render('Homepage/Kelas/Createkelas',$data);
    }

    public function save(Paketrequest $r,$id = null){

        if($r->foto != null){
            $filename = Uploadfile::uploadSingle($foto, 'kelas/');
            $data['foto'] = 'kelas/'.$filename;
        }

        if($r->validated()){
            $data['materi'] = $r->materi;
            $data['jenis'] = $r->jenis;
            $data['harga'] = $r->harga;
            $data['pertemuan'] = $r->pertemuan;
            if($id){
                Kelasm::where('id',$id)->update($data);
            }else{
                Kelasm::create($data);
            }
        }

        return Redirect::route('kelass');
    }

    public function hapusKelas($id){
        Kelasm::where('id',$id)->delete();
        return Redirect::back();
    }
}
