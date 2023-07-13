<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bookingm;

class BookingController extends Controller
{
    public function index(Request $r)
    {
        $data['booking'] = Bookingm::search($r->cari)->paginate($r->perpage ?? 10);
        return Inertia::render('Homepage/Booking',$data);
    }
}
