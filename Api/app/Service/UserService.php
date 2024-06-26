<?php

namespace App\Service;

use App\Exceptions\UserException;
use App\Http\Resources\AuthResource;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Jobs\SendVerifyEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


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
            $data['remember_token'] = Str::random(60);
            $user = User::create($data);
            dispatch(new SendVerifyEmailJob($user->email, $user->remember_token, $user->idUser));
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

    public function resendEmail(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) {
                throw new UserException('', 400);
            }
            dispatch(new SendVerifyEmailJob($user->email, $user->remember_token, $user->idUser));
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function validateEmail(string $id, string $token)
    {
        try {
            $user = User::where('idUser', $id)->where("remember_token", $token)->first();
            if (!$user) throw new UserException('', 400);

            $user->touch('email_verified_at');
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function recoverPasswordSendEmail(string $email)
    {
        try {
            $user = User::where("email", $email)->first();
            if (!$user) throw new UserException("User not found");

            $token = Str::random(60);
            $passwordResetToken = DB::table('password_reset_tokens')->where('email', $email)->first();

            if ($passwordResetToken) {
                DB::table('password_reset_tokens')->where('email', $email)->update([
                    'token' => $token,
                    'created_at' => now(),
                ]);
            } else {
                DB::table('password_reset_tokens')->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => now(),
                ]);
            }

            SendRecoverPasswordEmailJob::dispatch($email, $token);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function resetPassword(array $data)
    {
        try {
            $passwordResetTokens = DB::table('password_reset_tokens')->where('token', $data['token'])->first();
            if (!isset($passwordResetTokens)) throw new UserException("Token invalid");

            User::where('email', $passwordResetTokens->email)->update([
                'password' => Hash::make($data['password']),
            ]);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
