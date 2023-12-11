<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Core\NotifikasiController;

use Barryvdh\DomPDF\Facade\Pdf;

class SertifikatController extends Controller
{
    public function index(){
        $data['tanggal'] = NotifikasiController::tglIndo(date('Y-m-d'));
        $pdf = Pdf::loadView('sertifikat/sertifikat_depan',$data)->setPaper('a4', 'landscape');
        return $pdf->stream('sertifikat_depan.pdf');
        // return view('sertifikat/sertifikat_depan');
    }

    public function belakang(){
        $pdf = Pdf::loadView('sertifikat/sertifikat_belakang')->setPaper('a4', 'landscape');
        return $pdf->stream('sertifikat_belakang.pdf');
    }
}
