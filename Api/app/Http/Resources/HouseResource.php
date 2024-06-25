<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HouseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "idHouse" => $this->idHouse,
            "title" => $this->title,
            "description" => $this->description,
            "rooms" => $this->rooms,
            "value" => $this->value,
            "address" => $this->address,
            "image"=> ImageResource::collection($this->whenLoaded("images")),
        ];
    }
}
