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
    public function index($status = 'NULL', $dari = 0, $sampai = 0)
    {
        if($dari != 0 && $sampai != 0 && $status != "NULL"){
            $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                        ->leftjoin('pengguna','pengguna.id','booking.id_user')
                        ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                        ->where('booking.status',$status)
                        ->whereBetween('booking.tanggal',[$dari, $sampai])
                        ->orderBy('booking.id','DESC')
                        ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna')
                        ->get();
        }elseif($status != "NULL"){
            $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                        ->leftjoin('pengguna','pengguna.id','booking.id_user')
                        ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                        ->where('booking.status',$status)
                        ->orderBy('booking.id','DESC')
                        ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna')
                        ->get();
        }elseif($dari != 0 && $sampai != 0){
            $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                        ->leftjoin('pengguna','pengguna.id','booking.id_user')
                        ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                        ->whereBetween('booking.tanggal',[$dari, $sampai])
                        ->orderBy('booking.id','DESC')
                        ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna')
                        ->get();
        }else{
            $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                        ->leftjoin('pengguna','pengguna.id','booking.id_user')
                        ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                        ->orderBy('booking.id','DESC')
                        ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna')
                        ->get();
        }


        $data['mentor'] = Mentorm::where('status','aktif')->get();
        return Inertia::render('Dashboard',$data);
    }
}
