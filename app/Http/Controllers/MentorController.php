<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Mentorm;
use App\Http\Requests\MentorRequest;

class MentorController extends Controller
{
    public function index(Request $r){
        $data['mentors'] = Mentorm::paginate($r->perpage ?? 12);
        return Inertia::render('Homepage/Mentor/Mentor',$data);
    }

    public function status($id,$sts){
        $status = $sts == 'aktif' ? 'tidak aktif' : 'aktif';
        $data['status'] = DB::table('mentor')->where('id', $id)->update(['status' => $status]);
        return Redirect::back();
    }

    public function create(){
        return Inertia::render('Homepage/Mentor/Create');
    }

    public function save(MentorRequest $r){
        if($r->validated()){
            $file = $r->file('foto');
            $fileName = time().'-'.$file->getClientOriginalName();
            $file->move('uploads', $fileName);
            Mentorm::create([
                'nama_mentor' => $r->nama_mentor,
                'bidang' => $r->bidang,
                'email' => $r->email,
                'password' => Hash::make($r->password),
                'telpon' => $r->telpon,
                'alamat' => $r->alamat,
                'foto' => url('uploads/'.$fileName)
            ]);
        }

        return Redirect::route('mentor');
    }

    public function edit($id){
        $data['mentor'] = Mentorm::where('id',$id)->first();
        return Inertia::render('Homepage/Mentor/Edit',$data);
    }
}
