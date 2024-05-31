<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;


Route::resource('niveis', NivelController::class);
