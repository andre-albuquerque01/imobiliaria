<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    use HasFactory, HasUlids;
    protected $table = 'houses';
    protected $primaryKey = "idHouse";
    protected $fillable = [
        'title',
        'description',
        'rooms',
        'value',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'idUser');
    }
    public function images()
    {
        return $this->hasMany(Images::class, 'house_id', 'idHouse');
    }
}
