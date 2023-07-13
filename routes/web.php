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
    KelasController
};


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/',[Logincontroller::class, 'index'])->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/booking', [BookingController::class, 'index'])->name('booking');

    Route::get('/mentor', [MentorController::class, 'index'])->name('mentor');

    Route::get('/member', [MemberController::class, 'index'])->name('member');
    Route::get('/member-add', [MemberController::class, 'add'])->name('member-add');
    Route::post('/member-add-save', [MemberController::class, 'simpan'])->name('member-add-save');

    Route::get('/kelas', [KelasController::class, 'index'])->name('kelas');
});

require __DIR__.'/auth.php';
