<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KodeunitRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_kelas' => ['required','integer', 'max:255'],
            'unit_kompetensi' => ['required','string', 'max:255'],
            'kode_unit' => ['required','string', 'max:255'],
        ];
    }
}
