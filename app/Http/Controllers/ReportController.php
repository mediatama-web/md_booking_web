<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Bookingm;

class ReportController extends Controller
{
    public function index($month = null){
        if($month){
            $pecah = explode("-",$month);
            $bulan = $pecah[1];
        }else{
            $bulan = date('m');
        }
        $data['report'] = Bookingm::leftjoin('mentor','booking.id_mentor','mentor.id')
                        ->select(DB::raw("COUNT(*) as total"),'mentor.nama_mentor','booking.tanggal')
                        ->whereMonth('tanggal',$bulan)
                        ->where('booking.status','diterima')
                        ->groupBy('booking.id_mentor')
                        ->orderBy('total','DESC')
                        ->get();

        return Inertia::render('Homepage/Report/Report',$data);
    }
}
