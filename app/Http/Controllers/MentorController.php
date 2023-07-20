<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Mentorm;

class MentorController extends Controller
{
    public function index(){
        $data['mentors'] = Mentorm::get();
        return Inertia::render('Homepage/Mentor/Mentor',$data);
    }
}
