<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MentorRequest extends FormRequest
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
            'nama_mentor' => ['required','string', 'max:255'],
            'bidang' => ['required','string', 'max:255'],
            'email' => ['required','string'],
            'password' => ['required'],
            'alamat' => ['required'],
            'telpon' => ['required'],
            'foto' => ['mimes:jpeg,png,jpg'],
            'status' => ['string'],
        ];
    }
}
