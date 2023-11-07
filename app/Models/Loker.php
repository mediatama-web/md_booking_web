<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Loker extends Model
{
    use HasFactory, Searchable;
    protected $table = 'loker';
    protected $fillable = ['judul','deskripsi','tgl_tayang','foto',];

    public function toSearchableArray(): array
    {
        return [
            'judul' => $this->judul,
            'deskripsi' => $this->deskripsi,
        ];
    }
}
