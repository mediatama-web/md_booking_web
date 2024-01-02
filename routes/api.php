<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Android\{
    ApiController,
};

use App\Http\Controllers\NotifikasiController;
Route::post('/login',[ApiController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/banner',[ApiController::class, 'banner']);
    Route::get('/mentor',[ApiController::class, 'mentor']);
    Route::get('/jadwalbooking',[ApiController::class, 'bookinguser']);
    Route::get('/getkelasuser',[ApiController::class, 'getkelasuser']);
    Route::get('/getpertemuan/{id}/{status}',[ApiController::class, 'getpertemuan']);
    Route::post('/simpanbooking',[ApiController::class, 'simpanbooking']);
    Route::get('/getuser',[ApiController::class, 'getUser']);
    Route::get('/hapusbooking/{id}',[ApiController::class, 'hapusbooking']);
    Route::get('/absen/{id_booking}',[ApiController::class, 'absen']);
    
    // loker
    Route::get('/loker',[ApiController::class, 'loker']);

    Route::post('/updateToken',[NotifikasiController::class, 'updateToken']);
    
    Route::post('/upload-profile',[ApiController::class, 'uploadProfile']);
    Route::post('/upload-cv',[ApiController::class, 'uploadCv']);
    Route::post('/upload-linkedin',[ApiController::class, 'uploadLinkedin']);

    // sertifikat
    Route::get('/sertifikat',[ApiController::class, 'sertifikat']);
});


