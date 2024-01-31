<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Controllers\Core\UploadController;
use App\Models\{
    Penggunam,
    Daftarkelasm,
    Bookingm
};

class SertifikatController extends Controller
{
    public function index($id,$kelas){
        $data['sertifikat'] = Daftarkelasm::leftJoin('pengguna as a','a.id','daftarkelas.id_user')
                                ->leftJoin('kelas as b','b.id','daftarkelas.id_kelas')
                                ->select('a.nama_pengguna','daftarkelas.tanggal_terbit','daftarkelas.no_sertifikat','b.kode_kelas','b.keterangan')
                                ->where('daftarkelas.id_user',$id)
                                ->where('daftarkelas.id_kelas',$kelas)
                                ->first();

        $data['qr'] = UploadController::generateQr('http://localhost:8000/sertifikat-depan/1/3');

        // return view('sertifikat/sertifikat_depan',$data);

        $pdf = Pdf::loadView('sertifikat/sertifikat_depan',$data)->setPaper('a4', 'landscape');
        return $pdf->stream('sertifikat_depan.pdf');
    }

    public function belakang(){
        $pdf = Pdf::loadView('sertifikat/sertifikat_belakang')->setPaper('a4', 'landscape');
        return $pdf->stream('sertifikat_belakang.pdf');
    }
}
