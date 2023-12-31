<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\SendPushNotification;
use GuzzleHttp\Client;
use App\Models\User;

class NotifikasiController extends Controller
{
    public static function saveToken(Request $request)
    {
        auth()->user()->update(['fcm_token'  =>  $request->token]);
        return response()->json(['token saved successfully.']);
    }

    public static function sendNotification($title,$pesan)
    {
        $firebaseToken = User::whereNotNull('fcm_token')->pluck('fcm_token')->all();
            
        $SERVER_API_KEY = env('FCM_SERVER_KEY');
      
        $data = [
            "registration_ids" => $firebaseToken,
            "notification" => [
                "title" => $title,
                "body" => $pesan,  
            ]
        ];
        
        $dataString = json_encode($data);
      
        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];
      
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
                 
        $response = curl_exec($ch);

        return response()->json($response);
    }

    public function updateToken($id, $token){
        $user = auth('sanctum')->user();
        $data = Penggunam::where('id',$id)->update(['fcm_token' => $token]);
        return response()->json(['pesan' => 'success']);
    }
}
