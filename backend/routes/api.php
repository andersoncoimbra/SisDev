<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;


Route::resource('niveis', NivelController::class);
Route::resource('desenvolvedores', DesenvolvedorController::class);
