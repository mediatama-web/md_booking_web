<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;500&display=swap');
    @page {
        size: A4 landscape;
        margin: 0px;   
    }

    body {
        background-image: url('sertifikat/sertifikat_depan.png');
        background-repeat: no-repeat;
        background-size: 100%;
        font-family: 'Poppins', sans-serif;
        
    }

    #belakang {
        background-image: url('sertifikat/sertifikat_belakang.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }

    #sertifikat {
        position: absolute;
        width: 100%;
        text-align : center;
        color: #1D2F5F;
        top: 12%;
        font-size : 85px;
    }
    
    #nomor {
        position: absolute;
        width: 100%;
        top: 25%;
        font-size : 16px;
        text-align : center;
    }
    
    #title1 {
        position: absolute;
        top: 34%;
        width: 100%;
        font-size : 22px;
        text-align : center;
    }
    
    #title2 {
        position: absolute;
        width : 100%;
        top: 44%;
        color: #1D2F5F;
        font-size : 30px;
        text-align : center;
    }
    
    #title3 {
        position: absolute;
        width : 100%;
        top: 54%;
        color: #1D2F5F;
        font-size : 16px;
        text-align : center;
    }
    
    #title4 {
        position: absolute;
        top: 71%;
        left: 40%;
        color: #1D2F5F;
        font-size : 16px;
        text-align : left;
    }
    
    #title5 {
        position: absolute;
        top: 85%;
        left: 40%;
        color: #1D2F5F;
        font-size : 16px;
        text-align : left;
    }
    
    #ttd {
        position: absolute;
        top: 70%;
        left: 40%;
        color: #1D2F5F;
        width: 25%;
    }
</style>

<body>

    <div id="depan">
        <b id="sertifikat">SERTIFIKAT</b>

        <span id="nomor">
            Nomor : <?= str_pad($sertifikat->no_sertifikat,5,'0',STR_PAD_LEFT); ?>/<?= $sertifikat->kode_kelas ?>/S/LPK.MWI/XII/<?= date('Y') ?>
            <br>
            Nomor Izin Lembaga : 07092200866450001
        </span>

        <span id="title1">
            DIBERIKAN KEPADA :
        </span>
        
        <span id="title2">
            <?= $sertifikat->nama_pengguna ?>
        </span>
        
        <span id="title3">
            Atas Kelulusan Dalam Pelatihan
            <br>
            <b style="color:red; font-size:20px">DESIGN GRAFIS</b>
            <br>
            dan dinyatakan <b style="color:red">Kompeten</b> Standar LPK. Mediatama Web Indonesia
        </span>
        
        <span id="title4">
            Padang, <?= App\Http\Controllers\Core\NotifikasiController::tglIndo(date('Y-m-d')) ?>
            <br>
            Pimpinan LPK. MEDIATAMA WEB INDONESIA
        </span>

        <img src="ttd/ttd_gema.png" id="ttd" alt="">
        
        <span id="title5">
            Ferri Achmad Effindri, M.kom
        </span>
    </div>

    <div id="belakang">

    </div>
    
</body>
</html>