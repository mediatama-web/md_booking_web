<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Kelasm;
use App\Models\Transaksi;

use App\Http\Requests\PendaftaranRequest;
use App\Http\Controllers\Core\UploadController as Uploadfile;

class RegisterController extends Controller
{
    public function daftar(PendaftaranRequest $r){
        if($r->validated()){
            $user = Penggunam::create([
                        'nama_pengguna' => $r->nama_pengguna,
                        'no_telpon' => $r->no_telpon,
                        'alamat' => $r->alamat,
                        'email' => $r->email,
                        'password' => Hash::make('mediatama123'),
                        'tgl_daftar' => date('Y-m-d'),
                        'foto' => 'image/user.png',
                        'info' => $r->info,
                    ]);

            $foto = Uploadfile::uploadSingle($r->foto,"transaksi/");
            Transaksi::create(['id_user' => $user->id, 'foto' => $foto]);

            return response()->json(['status' => 200]);
        }else{
            return response()->json(['status' => 200, 'error' => $r->validated()]);
        }
    }

    public function getkelas($jenis){
        $kelas = Kelasm::where('jenis',$jenis)->select('materi','harga','id')->get();
        return response()->json(['kelas' => $kelas]);
    }
}
