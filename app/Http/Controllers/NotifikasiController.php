<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\SendPushNotification;
use GuzzleHttp\Client;
use App\Models\Penggunam;

class NotifikasiController extends Controller
{
    public function updateToken($id,$token)
    {
        try{
            Penggunam::where('id',$id)->update(['fcm_token'=> $token]);
            return response()->json([
                'success'=>true
            ]);
        }catch(\Exception $e){
            report($e);
            return response()->json([
                'success'=>false
            ],500);
        }
    }

    public function sendnotif()
    {
        $fcmToken = 'ek5Vdb2WTMWfDdaE5Tmibw:APA91bHnm3_-PB1WQ4aCqZCTPo8SRKzrG26L8_4fr9GyMQ8mvvnbQVg2i-LbljG7U5sEEZWIKmL7CZy6V8WBLbp5x8NQ7fas85S4S-_aFiQ11zf9YAn4nyLcEk_vU08_HW4v1xevT0yA';
        $notificationTitle = 'INFORMATION';
        $notificationBody = 'Silahkan update aplikasi anda keversi terbaru';

        $serverKey = 'AAAArhqn0G4:APA91bE8HwHrYEwDDAdCXD5dqEF3ALcodi3lcTEheYmJ1tb3C5iST26qHyF-ju8i7q4xQaO-7ZTVgTPaAV1_22ye7vezmj0CHwYxT_PvY8zKMySivpYW9HplfRE8o3I-JfoNxPFPVkUB'; 

        $client = new Client();
        $response = $client->post('https://fcm.googleapis.com/fcm/send', [
            'headers' => [
                'Authorization' => 'key='.$serverKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'to' => $fcmToken,
                'notification' => [
                    'title' => $notificationTitle,
                    'body' => $notificationBody,
                ],
            ],
        ]);

        return response()->json(['message' => 'Berhasil']);
    }
}
