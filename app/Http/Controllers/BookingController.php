<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bookingm;
use App\Models\Penggunam;
use App\Models\Mentorm;
use App\Models\Daftarkelasm;
use App\Http\Requests\Bookingrequest;

use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\Core\NotifikasiController as Notiff;

class BookingController extends Controller
{
    public function index(Request $r)
    {
        $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                    ->leftjoin('pengguna','pengguna.id','booking.id_user')
                    ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                    ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna','pengguna.lokasi')
                    ->where("pengguna.nama_pengguna",'LIKE','%'.$r->cari.'%')
                    ->orderBy('id','DESC')
                    ->paginate($r->perpage ?? 10);
        
        $data['mentor'] = Mentorm::where('status','aktif')->get();
        
        return Inertia::render('Homepage/Booking/Booking',$data);
    }
    
    public function add(Request $r)
    {
        $data['pengguna'] = Penggunam::where('status_akun','aktif')->get();
        $data['mentor'] = Mentorm::where('status','aktif')->get();
        $data['daftarkelas'] = Daftarkelasm::join('kelas','kelas.id','daftarkelas.id_kelas')->get();
        return Inertia::render('Homepage/Booking/Create',$data);
    }

    public function save(Bookingrequest $r){
        if($r->validated()){
            Bookingm::create($r->validated());
            NotifikasiController::sendNotification('NOTICE','Ada Booking Jadwal Hari Ini');
        }

        return Redirect::route('booking');
    }

    public function statuschange(Request $r){
        Bookingm::where('id',$r->id)->update(['status' => $r->status]);

        $data = Bookingm::where('id',$r->id)->first();
        // data user 
        $pengguna = Penggunam::where('id',$data->id_user)->first();
        if($pengguna->fcm_token != null){
            Notiff::notifikasiSend($pengguna->fcm_token, 'INFO','Status Booking Anda '.$r->status);
        }
        return Redirect::back();
    }

    public function jamchange(Request $r){
        $cek = Bookingm::where('id',$r->id)->where('status','pending')->update(['jam' => $r->jam]);

        if($cek){
            NotifikasiController::sendNotification('NOTICE','Jadwal Sudah Tidak Dapat Dirubah lagi');
            return Redirect::back();
        }

        $data = Bookingm::where('id',$r->id)->first();
        // data user 
        $pengguna = Penggunam::where('id',$data->id_user)->first();
        if($pengguna->fcm_token != null){
            Notiff::notifikasiSend($pengguna->fcm_token, 'INFO','Jam Booking Anda Telah Dirubah');
        }
        return Redirect::back();
    }

    public function mentorchange(Request $r){
        Bookingm::where('id',$r->id)->update(['id_mentor' => $r->mentor]);
        return Redirect::back();
    }
    
    public function hapusBooking($id){
        Bookingm::where('id',$id)->delete();
        return response()->json(['pesan' => "berhasil"]);
    }
}
