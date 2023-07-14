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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'id_kelas' => ['required','string', 'max:255'],
            'id_user' => ['required','string', 'max:255'],
            'jenis_pembayaran' => ['required','string', 'max:255'],
            'jumlah_bayar' => ['required','string', 'max:255'],
            'status' => ['required','string', 'max:255'],
        ];
    }
}
