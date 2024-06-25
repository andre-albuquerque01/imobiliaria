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
            "rooms" => ["nullable", "string", "min:4", "max:255"],
            "value" => ["required", "string", "min:2", "max:255"],
            "address" => ["required", "string", "min:2", "max:255"],
        ];

        if ($this->method() === "PUT") {
            $rules["title"] = ["nullable", "string", "min:4", "max:255"];
            $rules["description"] = ["nullable", "string", "min:4", "max:255"];
            $rules["value"] = ["nullable", "string", "min:2", "max:255"];
            $rules["address"] = ["nullable", "string", "min:2", "max:255"];
        }
        return $rules;
    }
}
