<?php

namespace App\Service;

use App\Exceptions\UserException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Interface\UserServiceInterface;
use App\Jobs\SendRecoverPasswordEmailJob;
use App\Jobs\SendVerifyEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserService implements UserServiceInterface
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
                    return response()->json(['message' => 'E-mail não verificado'], 400);
                }

                $user = Auth::user();
                $token = $this->request->user()->createToken('Jesus' . $user->name, ['*'], now()->addHours(2))->plainTextToken;

                return response()->json(['token' => $token], 200);
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
            dispatch(new SendVerifyEmailJob($user->email, Crypt::encrypt($user->remember_token), $user->idUser));
            return response()->json(['message' => 'success'], 201);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function update(array $data)
    {
        try {
            $user = auth()->user();
            if (!Hash::check($data['password'], $user->password)) {
                return response()->json(['message' => 'Password incorrect'], 401);
            }
            $data['password'] = $user->password;
            User::where("idUser", $user->idUser)->update($data);
            return response()->json(['message' => 'success'], 200);
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
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function verifyEmail(string $id, string $token)
    {
        try {
            $user = User::where('idUser', $id)->first();
            if (!$user) {
                return response()->json(['message' => 'user not found'], 404);
            }
            if ($token == $user->remember_token) {
                $user->touch("email_verified_at");
                return response()->json(['message' => 'success'], 200);
            }
            return response()->json(['message' => 'Token invalid'], 401);
        } catch (UserException $e) {
            throw new UserException($e->getMessage());
        }
    }

    public function resendEmail(string $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            dispatch(new SendVerifyEmailJob($user->email, Crypt::encrypt($user->remember_token), $user->idUser));
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
    public function validateEmail(string $id, string $token)
    {
        try {
            $user = User::where('idUser', $id)->where("remember_token", $token)->first();
            if (!$user) return response()->json(['message' => 'User not found'], 404);

            $user->touch('email_verified_at');
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function sendTokenRecover(string $email)
    {
        try {
            $user = User::where("email", $email)->first();
            if (!$user) return response()->json(['message' => 'User not found'], 404);

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
            return response()->json(['message' => 'send e-mail'], 200);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }

    public function resetPassword(array $data)
    {
        try {
            $passwordResetTokens = DB::table('password_reset_tokens')->where('token', $data['token'])->first();
            if (!isset($passwordResetTokens)) return response()->json(['message' => 'Token invalid'], 404);

            User::where('email', $passwordResetTokens->email)->update([
                'password' => Hash::make($data['password']),
            ]);
            DB::table('password_reset_tokens')->where('token', $data['token'])->delete();
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            throw new UserException('', $e->getCode(), $e);
        }
    }
}
