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
    NotifikasiController
};

Route::get('/',[Logincontroller::class, 'index'])->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/booking', [BookingController::class, 'index'])->name('booking');
    Route::get('/booking-add/{id?}', [BookingController::class, 'add'])->name('booking-add');
    Route::post('/booking-save/{id?}', [BookingController::class, 'save'])->name('booking-save');
    Route::post('/booking-statuschange', [BookingController::class, 'statuschange'])->name('booking-statuschange');

    Route::get('/mentor', [MentorController::class, 'index'])->name('mentor');
    Route::get('/mentor-add', [MentorController::class, 'create'])->name('mentor-add');
    Route::post('/mentor-save', [MentorController::class, 'save'])->name('mentor-save');
    Route::get('/mentor-edit/{id}', [MentorController::class, 'edit'])->name('mentor-edit');
    Route::get('/mentor-status/{id}/{status}', [MentorController::class, 'status'])->name('mentor-status');

    Route::get('/member', [MemberController::class, 'index'])->name('member');
    Route::get('/member-add', [MemberController::class, 'add'])->name('member-add');
    Route::post('/member-add-save', [MemberController::class, 'simpan'])->name('member-add-save');
    Route::get('/member-hapus/{id}', [MemberController::class, 'hapusDataMember'])->name('member-hapus');
    Route::get('/member-aktifasi/{id}', [MemberController::class, 'aktifasiakun'])->name('member-aktifasi');
    Route::get('/member-daftarkelas/{id}', [MemberController::class, 'daftarkelas'])->name('member-daftarkelas');
    Route::post('/member-kelasdaftar/{id}', [MemberController::class, 'kelasdaftar'])->name('member-kelasdaftar');
    Route::get('/member-kelasHapus/{id}', [MemberController::class, 'hapuskelasdaftar'])->name('member-kelasHapus');

    Route::get('/report', [ReportController::class, 'index'])->name('report');

    Route::get('/kelas', [KelasController::class, 'index'])->name('kelas');
    Route::get('/kelas-add/{id?}', [KelasController::class, 'tambah'])->name('kelas-add');
    Route::post('/kelas-add-save/{id?}', [KelasController::class, 'save'])->name('kelas-add-save');
    Route::get('/kelas-hapusKelas/{id?}', [KelasController::class, 'hapusKelas'])->name('kelas-hapusKelas');

    Route::get('update-token/{token}',[NotifikasiController::class, 'updateToken'])->name('update-token');
});

    Route::post('/save-token', [NotifikasiController::class, 'saveToken'])->name('save-token');
    Route::get('/send-notification', [NotifikasiController::class, 'sendNotification'])->name('send-notification');

require __DIR__.'/auth.php';
