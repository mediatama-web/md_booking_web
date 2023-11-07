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
    public function index()
    {
        $tgl = date('Y-m-d');
        $data['booking'] = Bookingm::join('mentor','booking.id_mentor','mentor.id')
                    ->leftjoin('pengguna','pengguna.id','booking.id_user')
                    ->leftjoin('kelas','kelas.id','booking.id_daftarkelas')
                    ->where('booking.tanggal',$tgl)
                    ->select('booking.*','mentor.nama_mentor','kelas.materi','pengguna.nama_pengguna')
                    ->get();

        $data['mentor'] = Mentorm::where('status','aktif')->get();
        return Inertia::render('Dashboard',$data);
    }
}
