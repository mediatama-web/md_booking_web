<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Kelasm;
use App\Models\Transaksi;
use App\Models\Daftarkelasm;
use App\Models\Penggunam;

use App\Http\Requests\PendaftaranRequest;
use App\Http\Requests\PendaftaranofflineRequest;
use App\Http\Controllers\Core\UploadController as Uploadfile;
use App\Http\Controllers\Core\NotifikasiController as Notifikasi;

class RegisterController extends Controller
{
    public function daftar(PendaftaranRequest $r){
        if($r->validated()){
            $user = Penggunam::create([
                        'nama_pengguna' => $r->nama_pengguna,
                        'no_telpon' => $r->no_telpon,
                        'alamat' => $r->alamat,
                        'email' => $r->email,
                        'lokasi' => $r->lokasi,
                        'password' => Hash::make('mediatama123'),
                        'tgl_daftar' => date('Y-m-d'),
                        'foto' => 'image/user.png',
                        'info' => $r->info,
                        'status_akun' => "tidak aktif",
                    ]);

            $kelas = Daftarkelasm::create([
                'id_user' => $user->id,
                'id_kelas' => $r->id_kelas,
                'status' => 'tidak aktif'
            ]);

            if($r->lokasi == 'Mediatama Web'){
                $from = "information@mediatamaweb.com";
            }else{
                $from = "information@nazeateknologi.com";
            }

            $foto = Uploadfile::uploadSingle($r->bukti_transfer,"transaksi/");
            Transaksi::create(['id_user' => $user->id, 'id_kelas' =>  $r->id_kelas, 'foto' => $foto, 'tanggal' => date('Y-m-d')]);

            Notifikasi::sendMail($r->email, $r->lokasi, $from);
            return response()->json(['status' => 200]);
        }else{
            return response()->json(['status' => 200, 'error' => $r->validated()]);
        }
    }

    public function getkelas($jenis){
        $kelas = Kelasm::where('jenis',$jenis)->select('materi','harga','id')->get();
        return response()->json(['kelas' => $kelas]);
    }

    public function transaksi(Request $r){
        $data['transaksi'] = Transaksi::leftJoin('kelas','kelas.id','transaksi.id_kelas')
                            ->leftJoin('pengguna','pengguna.id','transaksi.id_user')
                            ->select('transaksi.*','kelas.harga','kelas.materi','pengguna.nama_pengguna','transaksi.tanggal')    
                            ->paginate(10);
        return Inertia::render('Homepage/Transaksi/Transaksi',$data);
    }

    public function daftaroffline(PendaftaranofflineRequest $r){
        if($r->validated()){
            $user = Penggunam::create([
                        'nama_pengguna' => $r->nama_pengguna,
                        'no_telpon' => $r->no_telpon,
                        'alamat' => $r->alamat,
                        'email' => $r->email,
                        'lokasi' => $r->lokasi,
                        'password' => Hash::make('mediatama123'),
                        'tgl_daftar' => date('Y-m-d'),
                        'foto' => 'image/user.png',
                        'info' => $r->info,
                        'status_akun' => "tidak aktif",
                    ]);

            $kelas = Daftarkelasm::create([
                'id_user' => $user->id,
                'id_kelas' => $r->id_kelas,
                'status' => 'tidak aktif'
            ]);

            if($r->lokasi == 'Mediatama Web'){
                $from = "information@mediatamaweb.com";
            }else{
                $from = "information@nazeateknologi.com";
            }

            Notifikasi::sendMail($r->email, $r->lokasi, $from);
            return response()->json(['status' => 200]);
        }else{
            return response()->json(['status' => 200, 'error' => $r->validated()]);
        }
    }
}
