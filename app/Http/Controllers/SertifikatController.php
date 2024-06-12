<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use App\Models\{
    Penggunam,
    Daftarkelasm,
    Kelasm,
    UnitKompetensi
};

class SertifikatController extends Controller
{
    public function index($id,$kelas,$type){
        $data['sertifikat'] = Daftarkelasm::leftJoin('pengguna as a','a.id','daftarkelas.id_user')
                                ->leftJoin('kelas as b','b.id','daftarkelas.id_kelas')
                                ->select('a.nama_pengguna','a.foto','daftarkelas.lokasi','daftarkelas.tanggal_terbit','daftarkelas.no_sertifikat','b.kode_kelas','b.keterangan')
                                ->where('daftarkelas.id_user',$id)
                                ->where('daftarkelas.id_kelas',$kelas)
                                ->first();

        if($data['sertifikat']->lokasi == 'Nazea'){
            $data['pimpinan'] = 'Aulia Rahmi, M.kom';
            $data['lpk'] = 'LPK. NAZEA TEKNOLOGI';
            if($type == 'iya'){
                $data['ttd'] = 'ttd/ttd.png';
            }else{
                $data['ttd'] = null;
            }
            $data['kode'] = 'NTI';
            $data['bg_depan'] = "sertifikat/nazea_depan.png";
            $data['logodepan'] = "sertifikat/logodepan_nazea.png";
            $data['bg_belakang'] = "sertifikat/nazea_belakang.png";
        }else{
            $data['pimpinan'] = 'Ferri Achmad Effindri, M.kom';
            $data['lpk'] = 'LPK. MEDIATAMA WEB INDONESIA';
            if($type == 'iya'){
                $data['ttd'] = 'ttd/ttd.png';
            }else{
                $data['ttd'] = null;
            }
            $data['kode'] = 'MWI';
            $data['bg_depan'] = "sertifikat/sertifikat_depan.png";
            $data['logodepan'] = "sertifikat/logodepan_mediatama.png";
            $data['bg_belakang'] = "sertifikat/sertifikat_belakang.png";
        }

        $data['unit'] = UnitKompetensi::where('id_kelas',$kelas)->get();

        $data['qr'] = 'https://booking.mediatamaweb.com/sertifikat-verif/'.$id.'/'.$kelas;

        // return view('sertifikat/sertifikat_depan',$data);
        $pdf = Pdf::loadView('sertifikat/sertifikat_depan',$data)->setPaper('a4', 'landscape');
        return $pdf->stream('sertifikat_depan.pdf');
    }

    public function verifikasiSertifikat($id, $kelas){
        $data['member'] = Penggunam::where('id',$id)->first();
        $data['kelas'] = Kelasm::where('id',$kelas)->first();
        $cek = Daftarkelasm::where('id_user',$id)->where('id_kelas',$kelas)->first();
        if($cek->lokasi == 'Mediatama'){
            $data['logo'] = 'logodepan_mediatama.png';
        }else{
            $data['logo'] = 'logodepan_nazea.png';
        }
        return Inertia::render("Homepage/Sertifikat/Sertifikat",$data);
    }
}
