<?php

namespace App\Http\Controllers;

use App\Exceptions\UserException;
use App\Http\Resources\GeneralResource;
use App\Service\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(array $data)
    {
        try {
            return $this->userService->login($data);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function store(array $data)
    {
        try {
            return $this->userService->store($data);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function update(array $data)
    {
        try {
            return $this->userService->update($data);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function show()
    {
        try {
            return $this->userService->show();
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function destroy()
    {
        try {
            return $this->userService->destroy();
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return new GeneralResource(['message' => "success"]);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
