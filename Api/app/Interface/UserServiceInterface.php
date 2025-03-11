<?php

namespace App\Interface;

interface UserServiceInterface
{
    public function login(array $data);
    public function store(array $data);
    public function update(array $data);
    public function show();
    public function destroy();
    public function verifyEmail(string $id, string $token);
    public function resendEmail(string $email);
    public function validateEmail(string $id, string $token);
    public function sendTokenRecover(string $email);
    public function resetPassword(array $data);
}
