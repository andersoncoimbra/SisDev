<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateDesenvolvedorRequest extends FormRequest
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
            'nome' => 'string',
            'sexo' => 'in:M,F',
            'data_nascimento' => 'date',
            'hobby' => 'string',
            'nivel_id' => 'exists:nivels,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nome.string' => 'O campo nome deve ser uma string.',
            'sexo.in' => 'O campo sexo deve ser M ou F.',
            'data_nascimento.date' => 'O campo data de nascimento deve ser uma data.',
            'hobby.string' => 'O campo hobby deve ser uma string.',
            'nivel_id.exists' => 'O campo nível é inválido.',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 400));
    }
}
