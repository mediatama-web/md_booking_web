<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class Penggunam extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable, Searchable;

    protected $table = 'pengguna';
    protected $fillable = ['nama_pengguna','no_telpon','alamat','email','password','foto','tgl_daftar','status_akun','referal','info', 'fcm_token','remember_token'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function toSearchableArray(): array
    {
        return [
            'nama_pengguna' => $this->nama_pengguna,
            'email' => $this->email,
            'status_akun' => $this->status_akun,
            'no_telpon' => $this->no_telpon,
        ];
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('uploads/'.$value),
        );
    }
}
