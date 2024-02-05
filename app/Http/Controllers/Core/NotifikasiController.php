<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Mail\SendMail as KirimEmail;

class NotifikasiController extends Controller
{
    public static function notifikasiSend($fcmToken, $notificationTitle, $notificationBody)
    {
        $SERVER_API_KEY = env('FCM_SERVER_KEY');
        $serverKey = $SERVER_API_KEY; 
        
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

        return response()->json('berhasil');
    }

    public static function sendMail($email, $recieverName, $from)
    {
        $mailInfo = new \stdClass();
        $mailInfo->recieverName = $recieverName;
        $mailInfo->sender = "INFORMATION";
        $mailInfo->senderCompany = $recieverName;
        $mailInfo->to = $email;
        $mailInfo->name = "INFORMATION";
        $mailInfo->from = $from;
        $mailInfo->cc = "noreply@gmail.com";
        $mailInfo->bcc = "noreply@gmail.com";

        $mailInfo->subject = "Terimakasih Sudah Melakukan Pembelian Kelas kami. silahkan login melalui aplikasi atau silahkan hubungi customer service kami pada <a href='https://wa.me/+6282170214495'>082170214495</a>. Kami Ucapkan Terimakasih";
        Mail::to($email)
           ->send(new KirimEmail($mailInfo));

        return response()->json('berhasil');
    }

    public static function tglIndo($tanggal)
    {
        $bulan = array(
            1 =>       'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        );

        $var = explode('-', $tanggal);

        return $var[2] . ' ' . $bulan[(int)$var[1]] . ' ' . $var[0];
    }

    public static function sendwhatsapp(){
        $client = new Client();
        $client->post("https://api.mediatamaweb.co.id/whatsapp/send", [
            "headers" => [
                "Content-Type" => "application/json",
                "Authorization" => "Bearer " . env('WHATSAPP_TOKEN')
            ],
            "json" => [
                "messages" => [
                    [
                        "uid" => uniqid(),
                        "to" => "$whatsapp@s.whatsapp.net",
                        "type" => "text",
                        "value" => "📢 Sistem Absensi\n\nHalo $nama!\nSepertinya kamu belum mengambil absensi hari ini, silahkan periksa kehadiran-mu di aplikasi.\n\nTerima kasih 😁"
                    ]
                ]
            ],
        ]);
    }

}