<?php

namespace App\Jobs;

use App\Events\VerifyEmailEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendVerifyEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $email, $token, $id;
    /**
     * Create a new job instance.
     */
    public function __construct(string $email, string $token, string $id)
    {
        $this->email = $email;
        $this->token = $token;
        $this->id = $id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        event(new VerifyEmailEvent($this->email, $this->token, $this->id));
    }
}
