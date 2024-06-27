<?php

namespace Tests\Feature;

use App\Http\Controllers\UserController;
use App\Http\Requests\AuthRequest;
use App\Service\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    public function testLoginWithValidDataReturnsExpectedResult()
    {
        // Arrange
        $mockUserService = Mockery::mock(UserService::class);
        $mockUserService->shouldReceive('login')
            ->once()
            ->with(['email' => 'test@example.com', 'password' => 'test123'])
            ->andReturn(new JsonResponse(['message' => 'success'], 200));

        $this->app->instance(UserService::class, $mockUserService);

        $requestData = ['email' => 'test@example.com', 'password' => 'test123'];
        $request = new AuthRequest();
        $request->setContainer($this->app);
        $request->merge($requestData);

        $controller = new UserController($mockUserService);

        // Act
        $response = $controller->login($request);

        // Assert
        $response->assertStatus(200);
        $response->assertJson(['message' => 'success']);
    }

    // Additional test cases for different scenarios
    public function testLoginWithInvalidEmailReturns422()
    {
        // Arrange
        $requestData = ['email' => 'invalid_email', 'password' => 'test123'];
        $request = new AuthRequest();
        $request->setContainer($this->app);
        $request->merge($requestData);

        $controller = new UserController(Mockery::mock(UserService::class));

        // Act
        $response = $controller->login($request);

        // Assert
        $response->assertStatus(422);
        $response->assertJsonStructure(['email']);
    }

    public function testLoginWithInvalidPasswordReturns422()
    {
        // Arrange
        $requestData = ['email' => 'test@example.com', 'password' => ''];
        $request = new AuthRequest();
        $request->setContainer($this->app);
        $request->merge($requestData);

        $controller = new UserController(Mockery::mock(UserService::class));

        // Act
        $response = $controller->login($request);

        // Assert
        $response->assertStatus(422);
        $response->assertJsonStructure(['password']);
    }

    public function testLoginWithNonexistentUserReturns401()
    {
        // Arrange
        $mockUserService = Mockery::mock(UserService::class);
        $mockUserService->shouldReceive('login')
            ->once()
            ->andThrow(new \Exception('User not found', 401));

        $this->app->instance(UserService::class, $mockUserService);

        $requestData = ['email' => 'test@example.com', 'password' => 'test123'];
        $request = new AuthRequest();
        $request->setContainer($this->app);
        $request->merge($requestData);

        $controller = new UserController($mockUserService);

        // Act
        $response = $controller->login($request);

        // Assert
        $response->assertStatus(401);
        $response->assertJson(['message' => 'User not found']);
    }

    public function testLoginWithInvalidCredentialsReturns401()
    {
        // Arrange
        $mockUserService = Mockery::mock(UserService::class);
        $mockUserService->shouldReceive('login')
            ->once()
            ->andThrow(new \Exception('Invalid credentials', 401));

        $this->app->instance(UserService::class, $mockUserService);

        $requestData = ['email' => 'test@example.com', 'password' => 'test123'];
        $request = new AuthRequest();
        $request->setContainer($this->app);
        $request->merge($requestData);

        $controller = new UserController($mockUserService);

        // Act
        $response = $controller->login($request);

        // Assert
        $response->assertStatus(401);
        $response->assertJson(['message' => 'Invalid credentials']);
    }
}
