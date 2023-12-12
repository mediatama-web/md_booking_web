<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Kelasm extends Model
{
     use HasFactory, Searchable;

    protected $table = 'kelas';
    protected $fillable = ['materi','kode_kelas','jenis','harga','pertemuan','foto'];


    public function toSearchableArray(): array
    {
        return [
            'materi' => $this->materi,
            'jenis' => $this->jenis,
            
        ];
    }
}
