<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class MentorController extends Controller
{
    public function index(){
        return Inertia::render('Homepage/Mentor');
    }
}
