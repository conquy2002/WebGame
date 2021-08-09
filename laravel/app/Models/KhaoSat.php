<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhaoSat extends Model
{
    protected $table = 'categories' ;
    protected $key = 'id' ;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'note',
    ];
}
