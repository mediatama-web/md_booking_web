<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bookingm;
use App\Models\Mentorm;

class DashboardController extends Controller
{
    public function index($date = null)
    {
        if($date != null){
            $tanggal = $date;
        }else{
            $tanggal = date('Y-m-d');
        }
        $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                    ->leftjoin('pengguna','pengguna.id','booking.id_user')
                    ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                    ->where('booking.tanggal',$tanggal)
                    ->orderBy('booking.id','DESC')
                    ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna','pengguna.lokasi')
                    ->get();
        
        $data['mentor'] = Mentorm::where('status','aktif')->get();
        return Inertia::render('Dashboard',$data);
    }
}
