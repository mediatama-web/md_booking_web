<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Penggunam extends Model
{
    use HasFactory, Searchable;

    protected $table = 'pengguna';
    protected $fillable = ['nama_pengguna','no_telpon','alamat','email','password','foto','tgl_daftar','status_akun','referal'];

    public function toSearchableArray(): array
    {
        return [
            'nama_pengguna' => $this->nama_pengguna,
            'email' => $this->email,
            'status_akun' => $this->status_akun,
            'no_telpon' => $this->no_telpon,
        ];
    }
}
