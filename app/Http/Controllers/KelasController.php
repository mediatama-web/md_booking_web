<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kelasm;

class KelasController extends Controller
{
    public function index(Request $r){
        $data['kelas'] = Kelasm::search($r->cari)->paginate($r->perpage ?? 10);
        return Inertia::render('Homepage/Kelas',$data);
    }
}
