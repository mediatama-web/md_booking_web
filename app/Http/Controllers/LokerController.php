<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Loker;
use App\Http\Requests\Lokerrequest;

class LokerController extends Controller
{
    public function index(Request $r){
        $data['loker'] =  Loker::search($r->cari)->paginate($r->perpage ?? 10);
        return Inertia::render('Homepage/Loker/Loker',$data);
    }

    public function add($id = null){
        if($id){
            $data['loker'] = Loker::find($id);
        }else{
            $data['loker'] = [];
        }
        return Inertia::render('Homepage/Loker/Createloker',$data);
    }

    public function lokersave(Lokerrequest $r, $id = null){
        if($id){

        }else{
            if($r->validated()){
                
                $foto = $r->file('foto');
                if($foto){
                    $filename = time(). "." . $foto->getClientOriginalExtension();
                    $foto->move('foto/', $filename);
                    $data['foto'] = url('foto/'.$filename);
                }
    
                $data['judul'] = $r->judul;
                $data['deskripsi'] = $r->deskripsi;
                $data['tgl_tayang'] = date('Y-m-d');
                Loker::create($data);
            }
        }
        return Redirect::route('loker');
    }
    
    public function edit($id){
        $data['loker'] = Loker::where('id', $id)->first();
        return Inertia::render('Homepage/Loker/Lokeredit',$data);
    }
}

