<?php

namespace App\Service;

use App\Exceptions\HouseException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\HouseResource;
use App\Models\House;
use App\Models\Images;
use App\Models\User;

class HouseService
{

    public function index()
    {
        try {
            $house = House::with('images')->with('user')->paginate(50);
            return HouseResource::collection($house);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }
    public function housesUser()
    {
        try {
            $house = auth()->user()->house()->with('images')->paginate(50);
            return HouseResource::collection($house);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }

    public function store(array $data)
    {
        try {
            $house = auth()->user()->house()->create($data);

            $images = [
                'house_id' => $house->idHouse,
                'imageOne' => $data['imageOne'] ?? '',
                'imageTwo' => $data['imageTwo'] ?? '',
                'imageThree' => $data['imageThree'] ?? '',
                'imageFour' => $data['imageFour'] ?? '',
            ];
            Images::create($images);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }

    public function show(string $id)
    {
        try {
            $house = House::where('idHouse', $id)->with('images')->with('user')->first();
            return new HouseResource($house);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }
    public function showTitle(string $title)
    {
        try {
            $house = House::where('title', 'LIKE', '%' . $title . '%')->with('images')->with('user')->get();
            return HouseResource::collection($house);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }

    public function update(string $id, array $data)
    {
        try {
            $user = auth()->user();
            $house = $user->house()->where('idHouse', $id)->first();

            if ($house) {
                $house->update($data);

                $img = $house->images()->where('house_id', $house->idHouse)->first();

                if ($img) {
                    $images = [
                        'imageOne' => $data['imageOne'] ?? '',
                        'imageTwo' => $data['imageTwo'] ?? '',
                        'imageThree' => $data['imageThree'] ?? '',
                        'imageFour' => $data['imageFour'] ?? '',
                    ];
                    $img->update($images);
                }

                return new GeneralResource(['message' => 'success']);
            }

            return new GeneralResource(['message' => 'House not found'], 404);
        } catch (\Exception $e) {
            throw new HouseException('Failed to update house and images', $e->getCode(), $e);
        }
    }


    public function destroy(string $id)
    {
        try {
            House::findOrFail($id, 'idHouse')->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }
}
