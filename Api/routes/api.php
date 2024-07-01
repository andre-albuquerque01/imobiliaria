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
    Route::post('login', [UserController::class, 'login']);
    Route::post('email/resendEmail', [UserController::class, 'resendEmail']);
    Route::post('email/recoverPasswordSendEmail', [UserController::class, 'recoverPasswordSendEmail']);
    Route::put('resetPassword', [UserController::class, 'resetPassword']);
    Route::get('house', [HouseController::class, 'index']);
    Route::get('house/{id}', [HouseController::class, 'show']);
    Route::post('user', [UserController::class, 'store']);
    Route::get('email/verify/{id}/{token}', [UserController::class, 'verifyEmail']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::get('user', [UserController::class, 'show']);
        Route::put('user', [UserController::class, 'update']);
        Route::delete('user', [UserController::class, 'destroy']);

        Route::post('house', [HouseController::class, 'store']);
        Route::put('house/{id}', [HouseController::class, 'update']);
        Route::delete('house/{id}', [HouseController::class, 'destroy']);
    });
});
