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
            $tahun = $pecah[0];
        }else{
            $bulan = date('m');
            $tahun = date('Y');
        }
        
        $data['bulans'] = $tahun."-".$bulan;
        $data['report'] = Bookingm::leftjoin('mentor','booking.id_mentor','mentor.id')
                        ->select(DB::raw("COUNT(*) as total"),'mentor.nama_mentor','booking.tanggal','booking.id_mentor')
                        ->whereMonth('booking.tanggal',$bulan)
                        ->whereYear('booking.tanggal',$tahun)
                        ->where('booking.status','diterima')
                        ->groupBy('booking.id_mentor')
                        ->orderBy('total','DESC')
                        ->get();

        return Inertia::render('Homepage/Report/Report',$data);
    }

    public function reportdetail($id_mentor, $month){
        if($month){
            $pecah = explode("-",$month);
            $bulan = $pecah[1];
            $tahun = $pecah[0];
        }else{
            $bulan = date('m');
            $tahun = date('Y');
        }

        $booking = Bookingm::leftJoin('kelas','kelas.id','booking.id_daftarkelas')->leftJoin('pengguna','pengguna.id','booking.id_user')
                    ->whereMonth('booking.tanggal',$bulan)
                    ->whereYear('booking.tanggal',$tahun)
                    ->where('booking.status','diterima')
                    ->where('booking.id_mentor',$id_mentor)
                    ->select('booking.tanggal','booking.jam','pengguna.nama_pengguna','kelas.materi')
                    ->orderBy('booking.tanggal','ASC')
                    ->get();

        return response()->json(['detail' => $booking]);
    }
}
