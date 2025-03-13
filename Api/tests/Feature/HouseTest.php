<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HouseTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_house(): void
    {
        $user = User::factory()->create([]);
        House::factory()->create([
            'user_id' => $user->idUser,
        ]);
        $response = $this->getJson('/api/v1/house');

        $response->assertStatus(200);
    }
    public function test_show_house(): void
    {
        $user = User::factory()->create([]);
        $house = House::factory()->create([
            'user_id' => $user->idUser,
        ]);
        $response = $this->getJson("/api/v1/house/{$house->idHouse}");

        $response->assertStatus(200);
    }
    public function test_not_found_show_house(): void
    {
        $user = User::factory()->create([]);
        House::factory()->create([
            'user_id' => $user->idUser,
        ]);
        $response = $this->getJson("/api/v1/house/1");

        $response->assertStatus(404)
            ->assertJsonPath('message', 'House not found');
    }
    public function test_show_user_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        House::factory()->create([
            'user_id' => $user->idUser,
        ]);
        $response = $this->getJson("/api/v1/housesUser", [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(200);
    }
    public function test_not_found_show_user_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->getJson("/api/v1/housesUser", [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(404)
            ->assertJsonPath('message', 'House not found');
    }
    public function test_show_title_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        House::factory()->create([
            'title' => 'Test',
            'user_id' => $user->idUser,
        ]);
        $response = $this->getJson("/api/v1/houseTitle/Test");

        $response->assertStatus(200);
    }
    public function test_not_found_show_title_house(): void
    {
        $response = $this->getJson("/api/v1/houseTitle/testings");

        $response->assertStatus(404)
            ->assertJsonPath('message', 'House not found');
    }
    public function test_delete_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $house = House::factory()->create([
            'user_id' => $user->idUser,
        ]);
        $response = $this->deleteJson("/api/v1/house/{$house->idHouse}", [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(200);
    }
    public function test_not_found_delete_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->deleteJson("/api/v1/house/1", [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(500);
    }
    public function test_store_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $response = $this->postJson("/api/v1/house", [
            'title' => 'Test',
            'description' => 'Test description',
            'rooms' => 1,
            'value' => 100000,
            'address' => 'Test',
            'image' => [
                'https://www.empreendedor-digital.com/wp-content/uploads/url-curta-personalizada.jpg',
                'https://www.empreendedor-digital.com/wp-content/uploads/url-curta-personalizada.jpg',
                'https://www.empreendedor-digital.com/wp-content/uploads/url-curta-personalizada.jpg'
            ],

        ], [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.message', 'success');
        $this->assertDatabaseHas('images', ['image' => 'https://www.empreendedor-digital.com/wp-content/uploads/url-curta-personalizada.jpg']);
    }
    public function test_update_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        $house = House::factory()->create([
            'title' => 'Test',
            'user_id' => $user->idUser,
        ]);

        $response = $this->putJson("/api/v1/house/{$house->idHouse}", [
            'description' => 'Test description aaaaaaaaaaaaa',
        ], [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.message', 'success');
    }
    public function test_not_found_update_house(): void
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ]);

        $credentials = [
            'email' => 'john.doe@example.com',
            'password' => 'strongPassword@1231254124',
        ];

        $loginResponse = $this->postJson('/api/v1/user/sessions', $credentials);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('token');

        House::factory()->create([
            'title' => 'Test',
            'user_id' => $user->idUser,
        ]);

        $response = $this->putJson("/api/v1/house/1", [
            'description' => 'Test description aaaaaaaaaaaaa',
        ], [
            'Authorization' => "Bearer " . $token,
        ]);

        $response->assertStatus(404)
            ->assertJsonPath('message', 'House not found');
    }
}
