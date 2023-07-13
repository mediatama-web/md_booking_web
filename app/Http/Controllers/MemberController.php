<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\MemberRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Penggunam;

class MemberController extends Controller
{
    public function index(Request $r){
        $data['member'] = Penggunam::search($r->cari)->paginate($r->perpage ?? 10);
        return Inertia::render('Homepage/Member/Member',$data);
    }

    public function add(Request $r){
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
}
