<?php

namespace App\Http\Controllers;

use App\Exceptions\UserException;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\UserRequest;
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

    public function login(AuthRequest $request)
    {
        return $this->userService->login($request->validated());
    }

    public function store(UserRequest $request)
    {
        try {
            return $this->userService->store($request->validated());
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function update(UserRequest $request)
    {
        try {
            return $this->userService->update($request->validated());
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

    public function verifyEmail(string $id, string $token)
    {
        try {
            return $this->userService->verifyEmail($id, $token);
        } catch (UserException $e) {
            throw new UserException();
        }
    }
    public function resendEmail(Request $request)
    {
        try {
            $validatedData = $request->validate(['email' => 'required|email']);
            return $this->userService->resendEmail($validatedData['email']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function recoverPasswordSendEmail(Request $request)
    {
        try {
            $validatedData = $request->validate(['email' => 'required|email']);
            return $this->userService->recoverPasswordSendEmail($validatedData['email']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function resetPassword(RecoverPasswordRequest $request)
    {
        try {
            return $this->userService->resetPassword($request->validated());
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
