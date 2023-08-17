<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Daftarkelasm extends Model
{
    use HasFactory;

    protected $table = 'daftarkelas';
    protected $fillable = [
        'id','id_user','id_kelas','status'
    ];
}
