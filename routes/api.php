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
    Route::get('/jadwalbooking/{id}',[ApiController::class, 'bookinguser']);
    Route::get('/getkelasuser',[ApiController::class, 'getkelasuser']);
    Route::get('/getpertemuan',[ApiController::class, 'getpertemuan']);
    Route::post('/simpanbooking',[ApiController::class, 'simpanbooking']);
    Route::get('/getuser',[ApiController::class, 'getUser']);
    Route::get('/hapusbooking/{id}/{token}',[ApiController::class, 'hapusbooking']);

    Route::get('/sendnotif',[NotifikasiController::class, 'sendnotif']);
    Route::get('/updateToken/{id}/{token}',[NotifikasiController::class, 'updateToken']);
});
