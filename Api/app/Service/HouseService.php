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

    public function store(array $data)
    {
        try {
            $house = auth()->user()->house()->create($data);

            $images = [
                'house_id' => $house->idHouse,
                'imageOne' => $data['imageOne'],
                'imageTwo' => $data['imageTwo'],
                'imageThree' => $data['imageThree'],
                'imageFour' => $data['imageFour'],
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
            $house = House::findOrFail($id)->with('images')->first();
            return new HouseResource($house);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }

    public function update(string $id, array $data)
    {
        try {
            $house = auth()->user()->house()->findOrFail($id);
            $house->update($data);
            $images = [
                'imageOne' => $data['imageOne'],
                'imageTwo' => $data['imageTwo'],
                'imageThree' => $data['imageThree'],
                'imageFour' => $data['imageFour'],
            ];
            $house->images()->where('house_id', $house->idHouse)->update($images);

            return new GeneralResource(['message' => 'success']);
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
