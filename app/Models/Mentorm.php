<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\Bookingm;

class Mentorm extends Model
{
    use HasFactory;
    protected $table = 'mentor';
    protected $fillable = ['nama_mentor','bidang','email','password','alamat','telpon','foto','status'];

}
