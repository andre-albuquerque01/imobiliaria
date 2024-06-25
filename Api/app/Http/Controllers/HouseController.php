<?php

namespace App\Http\Controllers;

use App\Exceptions\HouseException;
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

    public function store(array $data)
    {
        try {
            return $this->houseService->store($data);
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

    public function update(string $id, array $data)
    {
        try {
            return $this->houseService->update($id, $data);
        } catch (\Exception $e) {
            throw new HouseException('Failed to update house and images', $e->getCode(), $e);
        }
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
