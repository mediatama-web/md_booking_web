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
use App\Http\Controllers\Core\UploadController as UploadFoto;


class MentorController extends Controller
{
    public function index(Request $r, $nama = null){
        if($nama){
            $data['mentors'] = Mentorm::where('nama_mentor','like', '%' . $nama . '%')->orderBy('id','DESC')->paginate($r->perpage ?? 12);
        }else{
            $data['mentors'] = Mentorm::orderBy('id','DESC')->paginate($r->perpage ?? 12);
        }
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

    public function save(MentorRequest $r, $id = null){
        if($r->validated()){
            $file = $r->file('foto');
            if($file != null){
                $data['foto'] = UploadFoto::uploadSingle($file,'mentor/');
            }
            $data['nama_mentor'] = $r->nama_mentor;
            $data['bidang'] = $r->bidang;
            $data['email'] = $r->email;
            if($r->password != null){
                $data['password'] = Hash::make($r->password);
            }
            $data['telpon'] = $r->telpon;
            $data['alamat'] = $r->alamat;

            if($id){
                Mentorm::where('id',$id)->update($data);
            }else{
                Mentorm::create($data);
            }
        }

        return Redirect::route('mentors');
    }

    public function edit($id){
        $data['mentor'] = Mentorm::where('id',$id)->first();
        return Inertia::render('Homepage/Mentor/Edit',$data);
    }
    
    public function hapus($id){
        $data['mentor'] = Mentorm::where('id',$id)->delete();
        return response()->json(['pesan' => 'ok']);
    }
}
