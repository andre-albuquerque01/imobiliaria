<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
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
        $rules = [
            "name" => ["required", "string", "min:4", "max:255"],
            "contact" => ["required", "string", "min:8", "max:11", "unique:users",],
            "term_aceite" => ["required"],
            "email" => [
                "required",
                "email",
                "max:255",
                "min:2",
                "unique:users",
            ],
            "password" => [
                "required",
                "confirmed",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            "password_confirmation" => [
                "required",
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ];

        if ($this->method() === "PUT") {
            $rules["name"] = ["nullable", "string", "min:4", "max:255"];
            $rules["email"] = [
                "required",
                "email",
                "max:255",
                "min:2",
                Rule::unique('users', 'email')->ignore($this->user()->idUser, 'idUser'),
            ];
            $rules["password"] = [
                "required",
                Password::min(8)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised(),
            ];
            $rules["password_confirmation"] = ["nullable"];
            $rules["term_aceite"] = ["nullable"];
            $rules["contact"] = ["nullable", "string", "min:8", "max:11", Rule::unique('users', 'contact')->ignore($this->user()->idUser, 'idUser'),];
        }
        return $rules;
    }

    public function messages()
    {
        return [
            "name.required" => "O nome é obrigatório.",
            "name.min" => "O nome deve ter pelo menos 3 caracteres.",
            "name.max" => "O nome não pode ter mais de 120 caracteres.",
            "name.regex" => "O nome contém caracteres inválidos.",
            
            "contact.required" => "O contato é obrigatório.",
            "contact.min" => "O nome deve ter pelo menos 8 caracteres.",
            "contact.max" => "O nome não pode ter mais de 11 caracteres.",
            "contact.unique" => "Esse número de telefone já está cadastrado.",
            
            "term_aceite.required" => "É necessário aceitar os termos.",
            "term_aceite.regex" => "O campo de aceite contém caracteres inválidos.",

            "email.required" => "O e-mail é obrigatório.",
            "email.email" => "O e-mail informado não é válido.",
            "email.max" => "O e-mail não pode ter mais de 255 caracteres.",
            "email.min" => "O e-mail deve ter pelo menos 2 caracteres.",
            "email.unique" => "Este e-mail já está cadastrado.",

            "password.required" => "A senha é obrigatória.",
            "password.confirmed" => "A confirmação da senha não corresponde.",
            "password.min" => "A senha deve ter pelo menos 8 caracteres.",
            "password.mixedCase" => "A senha deve conter pelo menos uma letra maiúscula e uma minúscula.",
            "password.letters" => "A senha deve conter pelo menos uma letra.",
            "password.numbers" => "A senha deve conter pelo menos um número.",
            "password.symbols" => "A senha deve conter pelo menos um símbolo.",
            "password.uncompromised" => "A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.",

            "password_confirmation.required" => "A confirmação da senha é obrigatória.",
            "password_confirmation.min" => "A confirmação da senha deve ter pelo menos 8 caracteres.",
        ];
    }
}
