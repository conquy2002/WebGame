<?php

use Illuminate\Support\Facades\Route;

Route:group(['prefix'=>'/question'],
 
     function () {

     	Route:get('/index',[app\Http\Controllers\Api\
            ApiQuestion::class ,'index']);

     });