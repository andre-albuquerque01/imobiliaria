<?php

namespace App\Http\Controllers;

use App\Exceptions\HouseException;
use App\Http\Requests\HouseRequest;
use App\Models\House;
use App\Service\HouseService;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    private $houseService;

    public function __construct(HouseService $houseService)
    {
        $this->houseService = $houseService;
    }
    public function index()
    {
        try {
            return $this->houseService->index();
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }
    public function housesUser()
    {
        return $this->houseService->housesUser();
    }

    public function store(HouseRequest $data)
    {
        try {
            return $this->houseService->store($data->validated());
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }

    public function show(string $id)
    {
        try {
            return $this->houseService->show($id);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }
    public function showTitle(string $title)
    {
        try {
            return $this->houseService->showTitle($title);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }

    public function update(string $id, HouseRequest $data)
    {
        return $this->houseService->update($id, $data->validated());
    }


    public function destroy(string $id)
    {
        try {
            return $this->houseService->destroy($id);
        } catch (\Exception $e) {
            throw new HouseException('', $e->getCode(), $e);
        }
    }
}
