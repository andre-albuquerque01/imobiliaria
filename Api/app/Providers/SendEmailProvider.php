<?php

namespace App\Providers;

use App\Events\RecoverPasswordEmailEvent;
use App\Events\VerifyEmailEvent;
use App\Listeners\SendEmailRecoverPasswordListener;
use App\Listeners\SendEmailRegisteredListener;
use Illuminate\Support\ServiceProvider;

class SendEmailProvider extends ServiceProvider
{
    protected $listen = [
        VerifyEmailEvent::class => [
            SendEmailRegisteredListener::class
        ],
        RecoverPasswordEmailEvent::class => [
            SendEmailRecoverPasswordListener::class
        ],
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
