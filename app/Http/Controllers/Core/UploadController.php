<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Response;
use Illuminate\Support\Facades\File;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class UploadController extends Controller
{

    public static function uploadMultiple($foto, $path)
    {
        $files = [];
        foreach ($foto as $i => $a) {
            $filename = time() . rand(1, 99) . '.' . $foto[$i]->getClientOriginalExtension();
            $foto[$i]->move($path, $filename);
            $files[] = $path . $filename;
        }

        return $files;
    }

    public static function uploadSingle($foto, $path)
    {
        $filename = time() . rand(1, 99) . '.' . $foto->getClientOriginalExtension();
        $foto->move($path, $filename);
        $files = $path . $filename;

        return $files;
    }

    public static function delFile($path)
    {
        if (File::exists(public_path($path))) {
            File::delete(public_path($path));
        }
    }

    public static function generateQr($url) {
        return QrCode::generate(
            $url,
        );
 
    }
}