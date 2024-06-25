<?php

use App\Http\Controllers\HouseController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/', function () {
    return response()->json(['Aqui está Ok'], 200);
});

Route::prefix('v1')->group(function () {
    Route::post('login', [UserController::class,'login']);
    Route::post('logout', [UserController::class,'logout']);
    Route::apiResource('house', HouseController::class);
    Route::apiResource('user', UserController::class);
});
