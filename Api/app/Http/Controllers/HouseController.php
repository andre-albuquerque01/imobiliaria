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

        return $this->houseService->index();
    }
    public function housesUser()
    {
        return $this->houseService->housesUser();
    }

    public function store(HouseRequest $data)
    {

        return $this->houseService->store($data->validated());
    }

    public function show(string $id)
    {

        return $this->houseService->show($id);
    }
    public function showTitle(string $title)
    {

        return $this->houseService->showTitle($title);
    }

    public function update(string $id, HouseRequest $data)
    {
        return $this->houseService->update($id, $data->validated());
    }


    public function destroy(string $id)
    {

        return $this->houseService->destroy($id);
    }
}
