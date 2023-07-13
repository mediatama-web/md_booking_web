<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;


class Bookingm extends Model
{
    use HasFactory, Searchable;

    protected $table = 'booking';


    public function toSearchableArray(): array
    {
        return [
            'tanggal' => $this->tanggal,
            'status' => $this->status,
        ];
    }
}
