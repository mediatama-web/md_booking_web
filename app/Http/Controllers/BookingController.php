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

class BookingController extends Controller
{
    public function index(Request $r)
    {
        $data['booking'] = Bookingm::join('mentor','mentor.id','booking.id_mentor')->select('booking.id','booking.jam','booking.tanggal','booking.status','mentor.nama_mentor')->search($r->cari)->paginate($r->perpage ?? 10);
        return Inertia::render('Homepage/Booking/Booking',$data);
    }
    public function add(Request $r)
    {
        $data['pengguna'] = Penggunam::get();
        $data['mentor'] = Mentorm::where('status','aktif')->get();
        $data['daftarkelas'] = Daftarkelasm::join('kelas','kelas.id','daftarkelas.id_kelas')->get();
        return Inertia::render('Homepage/Booking/Create',$data);
    }

    public function save(Bookingrequest $r){
        if($r->validated()){
            Bookingm::create($r->validated());
        }

        return Redirect::route('booking');
    }
}
