<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HouseRequest extends FormRequest
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
            "title" => ["required", "string", "min:4", "max:255"],
            "description" => ["required", "string", "min:4", "max:255"],
            "rooms" => ["nullable", "string", "min:1", "max:20"],
            "value" => ["required", "string", "min:2", "max:255"],
            "address" => ["required", "string", "min:2", "max:255"],
            "image" => ["required", "array", "min:1"], 
            "image.*" => ["required", "string", "url"], 
        ];

        if ($this->method() === "PUT") {
            $rules["title"] = ["nullable", "string", "min:4", "max:255"];
            $rules["description"] = ["nullable", "string", "min:4", "max:255"];
            $rules["value"] = ["nullable", "string", "min:2", "max:255"];
            $rules["address"] = ["nullable", "string", "min:2", "max:255"];
            $rules["image"] = ["nullable", "array"];
            $rules["image.*"] = ["nullable", "string", "url"];
        }

        return $rules;
    }


    public function messages()
    {
        return [
            "token.required" => "O token é obrigatório.",

            "title.required" => "O titulo é obrigatório.",
            "title.max" => "O titulo não pode ter mais de 255 caracteres.",
            "title.min" => "O titulo deve ter pelo menos 4 caracteres.",

            "description.required" => "O descrição é obrigatório.",
            "description.max" => "O descrição não pode ter mais de 255 caracteres.",
            "description.min" => "O descrição deve ter pelo menos 4 caracteres.",

            "value.required" => "O valor é obrigatório.",
            "value.max" => "O valor não pode ter mais de 255 caracteres.",
            "value.min" => "O valor deve ter pelo menos 2 caracteres.",

            "rooms.max" => "O quarto não pode ter mais de 20 caracteres.",
            "rooms.min" => "O quarto deve ter pelo menos 1 caracteres.",

            "address.max" => "O endereço não pode ter mais de 20 caracteres.",
            "address.min" => "O endereço deve ter pelo menos 1 caracteres.",

            "image.max" => "O endereço não pode ter mais de 20 caracteres.",
            "image.min" => "O endereço deve ter pelo menos 1 caracteres.",
        ];
    }
}
