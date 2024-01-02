<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitKompetensi extends Model
{
    use HasFactory;

    protected $table = 'unit_kompetensi';
    protected $fillable = ['id_kelas', 'unit_kompetensi', 'kode_unit'];

}
