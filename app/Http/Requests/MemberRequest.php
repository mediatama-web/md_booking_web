<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama_pengguna' => ['required','string', 'max:255'],
            'no_telpon' => ['required','numeric','min:11'],
            'alamat' => ['required','string','max:225'],
            'email' => ['required','string','max:225'],
            'lokasi' => ['required','string','max:225'],
            'info' => ['required','string','max:225'],
            'password' => ['string','max:225'],
            'tgl_daftar' => ['string','max:225'],
            'status_akun' => ['string','max:225'],
            'referal' => ['string','max:225'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_pengguna.required' => "Masukan Nama Pengguna",
            'no_telpon.required' => "Masukan Nomor Telpon",
            'no_telpon.numeric' => "Masukan Nomor Bukan Karakter",
            'alamat.required' => "Masukan Alamat",
            'email.required' => "Masukan Email",
            'lokasi.required' => "Masukan Lokasi",
            'info.required' => "Masukan Info",
            'password.required' => "Masukan Password",
            'tgl_daftar.required' => "Masukan Taggal Daftar",
            'status_akun.required' => "Masukan Status Akun",
            'referal.required' => "Masukan Referal",
        ];
    }
}
