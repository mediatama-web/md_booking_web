<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\android\{
    ApiController,
};
Route::post('/login',[ApiController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/banner',[ApiController::class, 'banner']);
    Route::get('/mentor',[ApiController::class, 'mentor']);
    Route::get('/jadwalbooking/{id}',[ApiController::class, 'bookinguser']);
    Route::get('/getkelasuser/{id}',[ApiController::class, 'getkelasuser']);
    Route::post('/simpanbooking',[ApiController::class, 'simpanbooking']);
});
