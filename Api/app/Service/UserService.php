<?php

namespace App\Service;

use App\Exceptions\UserException;
use App\Http\Resources\AuthResource;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function login(array $data)
    {
        try {
            if (Auth::attempt($data)) {
                if (User::where("email", $data["email"])->whereNull('email_verified_at')->exists()) {
                    return new GeneralResource(['message' => 'E-mail nao verificado']);
                }

                $token = $this->request->user()->createToken("Jesus" . auth()->user()->idUser, ['user'], now()->addHours(2))->plainTextToken;

                if (auth()->user()->isAdmin()) {
                    $token = $this->request->user()->createToken("Jesus" . auth()->user()->idUser, ['*'], now()->addHours(2))->plainTextToken;
                }

                return new AuthResource(['token' => $token]);
            }
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function store(array $data)
    {
        try {
            $data['password'] = Hash::make($data['password']);
            $data['is_admin'] = 0;
            User::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function update(array $data)
    {
        try {
            $user = auth()->user();
            if (!Hash::check($data['password'], $user->password)) {
                return new GeneralResource(['message' => 'Password incorret']);
            }
            User::where("idUser", $user->idUser)->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function show()
    {
        try {
            return new UserResource(auth()->user());
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function destroy()
    {
        try {
            User::findOrFail(auth()->user()->idUser)->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
