<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            "created_at" => Carbon::make($this->created_at)->format('d-m-Y H:i:s'),
            "image"=> ImageResource::collection($this->whenLoaded("images")),
            "user"=> new User2Resource($this->whenLoaded("user")),
        ];
    }
}
