<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kelasm;
use App\Models\UnitKompetensi;
use App\Http\Requests\Paketrequest;
use App\Http\Requests\KodeunitRequest;

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
    
    public function tambahKodeUnit($id = null){
        if($id != null){
            $data['units'] = UnitKompetensi::where('id_kelas',$id)->get();
        }else{
            $data['units'] = [];
        }
        
        $data['ids'] = $id;

        return Inertia::render('Homepage/Kelas/Createkodemapel',$data);
    }
    
    public function saveKodeUnit(KodeunitRequest $r, $id = null){
        if($r->validated()){
            $data['id_kelas'] = $r->id_kelas;
            $data['unit_kompetensi'] = $r->unit_kompetensi;
            $data['kode_unit'] = $r->kode_unit;
        }

        if($id != null){
            UnitKompetensi::where('id',$id)->update($data);
        }else{
            UnitKompetensi::create($data);
        }

        return Redirect::back();
    }
    
    public function deleteKodeUnit($id = null){
        
        UnitKompetensi::where('id',$id)->delete();

        return response()->json(['pesan' => "berhasil"]);
    }

    public function save(Paketrequest $r,$id = null){

        if($r->foto != null){
            $filename = Uploadfile::uploadSingle($r->foto, 'kelas/');
            $data['foto'] = $filename;
        }

        if($r->validated()){
            $data['materi'] = $r->materi;
            $data['kode_kelas'] = $r->kdkelas;
            $data['jenis'] = $r->jenis;
            $data['harga'] = $r->harga;
            $data['pertemuan'] = $r->pertemuan;
            $data['keterangan'] = $r->keterangan;
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
        return response()->json(['pesan' => 'ok']);
    }
}
