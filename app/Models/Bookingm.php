<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;


class Bookingm extends Model
{
    use HasFactory, Searchable;

    protected $table = 'booking';
    protected $fillable = ['id_user','tanggal','jam','id_mentor','id_daftarkelas','status'];

    public function toSearchableArray(): array
    {
        return [
            'tanggal' => $this->tanggal,
            'status' => $this->status,
        ];
    }
}
