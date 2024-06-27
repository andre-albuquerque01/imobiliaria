<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory, HasUlids;
    protected $table = 'images';
    protected $primaryKey = "idImage";
    protected $fillable = [
        'house_id',
        'imageOne',
        'imageTwo',
        'imageThree',
        'imageFour',
    ];

    public function images()
    {
        return $this->belongsTo(House::class, 'house_id', 'idHouse');
    }
}
