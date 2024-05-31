<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desenvolvedor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'idade',
        'hobby',
        'nivel_id',
    ];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->idade = date('Y') - date('Y', strtotime($model->data_nascimento));
        });
    }
}
