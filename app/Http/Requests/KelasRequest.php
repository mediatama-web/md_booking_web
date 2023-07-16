<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KelasRequest extends FormRequest
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
            'id_user' => ['required','integer', 'max:255'],
            'id_kelas' => ['required','integer', 'max:255'],
            'jenis_pembayaran' => ['string', 'max:255'],
            'jumlah_bayar' => ['string', 'max:255'],
            'status' => ['string', 'max:255'],
        ];
    }
}
