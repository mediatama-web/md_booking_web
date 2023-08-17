<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\android\{
    ApiController,
};

use App\Http\Controllers\NotifikasiController;
Route::post('/login',[ApiController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/banner',[ApiController::class, 'banner']);
    Route::get('/mentor',[ApiController::class, 'mentor']);
    Route::get('/jadwalbooking/{id}',[ApiController::class, 'bookinguser']);
    Route::get('/getkelasuser/{id}',[ApiController::class, 'getkelasuser']);
    Route::get('/getpertemuan/{id}',[ApiController::class, 'getpertemuan']);
    Route::get('/simpanbooking/{id}/{jam}/{tanggal}/{kelas}/{mentor}/{token}',[ApiController::class, 'simpanbooking']);
    Route::get('/getuser/{id}',[ApiController::class, 'getUser']);
    Route::get('/hapusbooking/{id}/{token}',[ApiController::class, 'hapusbooking']);

    Route::get('/sendnotif',[NotifikasiController::class, 'sendnotif']);
    Route::get('/updateToken/{id}/{token}',[NotifikasiController::class, 'updateToken']);
});
