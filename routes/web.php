<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\{
    ProfileController,
    Logincontroller,
    BookingController,
    MentorController,
    MemberController,
    KelasController,
    ReportController,
    NotifikasiController,
    DashboardController,
    LokerController,
    SertifikatController
};

use App\Http\Controllers\Api\RegisterController;

Route::get('/',[Logincontroller::class, 'index'])->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/{tgl?}', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/transaksis', [RegisterController::class, 'transaksi'])->name('transaksis');

    Route::get('/booking', [BookingController::class, 'index'])->name('booking');
    Route::get('/booking-add/{id?}', [BookingController::class, 'add'])->name('booking-add');
    Route::post('/booking-save/{id?}', [BookingController::class, 'save'])->name('booking-save');
    Route::get('/booking-delete/{id?}', [BookingController::class, 'hapusBooking'])->name('booking-delete');
    Route::post('/booking-statuschange', [BookingController::class, 'statuschange'])->name('booking-statuschange');
    Route::post('/booking-jamchange', [BookingController::class, 'jamchange'])->name('booking-jamchange');
    Route::post('/booking-mentorchange', [BookingController::class, 'mentorchange'])->name('booking-mentorchange');

    Route::get('/mentors/{nama?}', [MentorController::class, 'index'])->name('mentors');
    Route::get('/mentor-add', [MentorController::class, 'create'])->name('mentor-add');
    Route::post('/mentor-save/{id?}', [MentorController::class, 'save'])->name('mentor-save');
    Route::get('/mentor-edit/{id}', [MentorController::class, 'edit'])->name('mentor-edit');
    Route::get('/mentor-hapus/{id}', [MentorController::class, 'hapus'])->name('mentor-hapus');
    Route::get('/mentor-status/{id}/{status}', [MentorController::class, 'status'])->name('mentor-status');

    Route::get('/member', [MemberController::class, 'index'])->name('member');
    Route::get('/member-add', [MemberController::class, 'add'])->name('member-add');
    Route::post('/member-add-save', [MemberController::class, 'simpan'])->name('member-add-save');
    Route::get('/member-hapus/{id}', [MemberController::class, 'hapusDataMember'])->name('member-hapus');
    Route::get('/member-aktifasi/{id}', [MemberController::class, 'aktifasiakun'])->name('member-aktifasi');
    Route::get('/member-daftarkelas/{id}', [MemberController::class, 'daftarkelas'])->name('member-daftarkelas');
    Route::post('/member-kelasdaftar/{id}', [MemberController::class, 'kelasdaftar'])->name('member-kelasdaftar');
    Route::get('/member-kelasHapus/{id}', [MemberController::class, 'hapuskelasdaftar'])->name('member-kelasHapus');
    Route::get('/member-generate/{id}', [MemberController::class, 'generatesertifikat'])->name('member-generate');
    Route::get('/member-kelasdaftar-detail/{id_user}/{id_kelas}', [MemberController::class, 'daftarkelasdetail'])->name('member-kelasdaftar-detail');
    Route::get('/member-absen/{id_user}/{id_kelas}', [MemberController::class, 'absen'])->name('member-absen');
    Route::get('/member-absen-detail/{id_user}/{id_kelas}', [MemberController::class, 'memberabsen'])->name('member-absen-detail');
    Route::post('/upload-cv', [MemberController::class, 'uploadCv'])->name('upload-cv');

    Route::get('/report/{month?}', [ReportController::class, 'index'])->name('report');
    Route::get('/report-detail/{id_mentor}/{month?}', [ReportController::class, 'reportdetail'])->name('report-detail');
    
    Route::get('/lokers', [LokerController::class, 'index'])->name('lokers');
    Route::get('/loker-add/{id?}', [LokerController::class, 'add'])->name('loker-add');
    Route::post('/loker-save', [LokerController::class, 'lokersave'])->name('loker-save');

    Route::get('/kelass', [KelasController::class, 'index'])->name('kelass');
    Route::get('/kelas-add/{id?}', [KelasController::class, 'tambah'])->name('kelas-add');
    Route::post('/kelas-kode-mapel-save/{id?}', [KelasController::class, 'saveKodeUnit'])->name('kelas-kode-mapel-save');
    Route::get('/kelas-kode-mapel-add/{id?}', [KelasController::class, 'tambahKodeUnit'])->name('kelas-kode-mapel-add');
    Route::get('/kelas-kode-mapel-delete/{id?}', [KelasController::class, 'deleteKodeUnit'])->name('kelas-kode-mapel-delete');
    Route::post('/kelas-add-save/{id?}', [KelasController::class, 'save'])->name('kelas-add-save');
    Route::get('/kelas-hapusKelas/{id?}', [KelasController::class, 'hapusKelas'])->name('kelas-hapusKelas');

    Route::get('update-token/{token}',[NotifikasiController::class, 'updateToken'])->name('update-token');
});

    // cek data user
    Route::get('/cekdatauser/{id}', [MemberController::class, 'checkdatauser'])->name('cekdatauser');

    Route::post('/save-token', [NotifikasiController::class, 'saveToken'])->name('save-token');
    Route::get('/send-notification', [NotifikasiController::class, 'sendNotification'])->name('send-notification');

    Route::get('/sertifikat-depan/{id}/{kelas}', [SertifikatController::class, 'index'])->name('sertifikat-depan');
    Route::get('/sertifikat-belakang/{id}/{kelas}', [SertifikatController::class, 'belakang'])->name('sertifikat-belakang');

require __DIR__.'/auth.php';
