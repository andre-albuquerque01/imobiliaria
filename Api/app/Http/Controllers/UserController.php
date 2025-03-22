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
        return $this->userService->store($request->validated());
    }
    public function update(UserRequest $request)
    {
        return $this->userService->update($request->validated());
    }

    public function show()
    {
        return $this->userService->show();
    }

    public function destroy()
    {
        return $this->userService->destroy();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return new GeneralResource(['message' => "success"]);
    }

    public function verifyEmail(string $id, string $token)
    {

        return $this->userService->verifyEmail($id, $token);
    }
    public function resendEmail(Request $request)
    {
        $validatedData = $request->validate(['email' => 'required|email']);
        return $this->userService->resendEmail($validatedData['email']);
    }

    public function sendTokenRecover(Request $request)
    {
        $validatedData = $request->validate(['email' => 'required|email']);
        return $this->userService->sendTokenRecover($validatedData['email']);
    }
    public function resetPassword(RecoverPasswordRequest $request)
    {
        return $this->userService->resetPassword($request->validated());
    }
}
