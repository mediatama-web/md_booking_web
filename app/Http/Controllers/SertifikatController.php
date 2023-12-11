<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Barryvdh\DomPDF\Facade\Pdf;

class SertifikatController extends Controller
{
    public function index(){

        // $pdf = Pdf::loadView('sertifikat/sertifikat_depan')->setPaper('a4', 'landscape');
        // return $pdf->stream('sertifikat_depan.pdf');
        return view('sertifikat/sertifikat_depan');
    }
}
