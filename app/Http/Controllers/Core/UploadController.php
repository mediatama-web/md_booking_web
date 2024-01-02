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
        $qrCodes = [];
        $qrCodes['simple'] = QrCode::size(120)->generate($url);
        $qrCodes['changeColor'] = QrCode::size(120)->color(255, 0, 0)->generate($url);
        $qrCodes['changeBgColor'] = QrCode::size(120)->backgroundColor(255, 0, 0)->generate($url);
         
        $qrCodes['styleDot'] = QrCode::size(120)->style('dot')->generate($url);
        $qrCodes['styleSquare'] = QrCode::size(120)->style('square')->generate($url);
        $qrCodes['styleRound'] = QrCode::size(120)->style('round')->generate($url);
     
        $qrCodes['withImage'] = QrCode::size(200)->format('png')->merge('/public/qrcode/1644463030.png', .4)->generate($url);
         
        return $qrCodes;
 
    }
}