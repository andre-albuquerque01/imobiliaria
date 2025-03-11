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
    Route::prefix('user')->group(function () {
        Route::post('sessions', [UserController::class, 'login']);
        Route::post('register', [UserController::class, 'store']);
        Route::post('reSendEmail', [UserController::class, 'resendEmail']);
        Route::post('sendTokenRecover', [UserController::class, 'sendTokenRecover']);
        Route::get('verify/{id}/{token}', [UserController::class, 'verifyEmail']);
        Route::put('resetPassword', [UserController::class, 'resetPassword']);
    });
    
    Route::get('house', [HouseController::class, 'index']);
    Route::get('house/{id}', [HouseController::class, 'show']);
    Route::get('houseTitle/{title}', [HouseController::class, 'showTitle']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('user')->group(function () {
            Route::post('logout', [UserController::class, 'logout']);
            Route::get('show', [UserController::class, 'show']);
            Route::put('update', [UserController::class, 'update']);
            Route::delete('user', [UserController::class, 'destroy']);
        });

        Route::get('housesUser', [HouseController::class, 'housesUser']);
        Route::post('house', [HouseController::class, 'store']);
        Route::put('house/{id}', [HouseController::class, 'update']);
        Route::delete('house/{id}', [HouseController::class, 'destroy']);
    });
});
