<?php

namespace App\Interface;

interface HouseServiceInterface
{
    public function index();
    public function housesUser();
    public function store(array $data);
    public function show(string $id);
    public function showTitle(string $title);
    public function update(string $id, array $data);
    public function destroy(string $id);
}
