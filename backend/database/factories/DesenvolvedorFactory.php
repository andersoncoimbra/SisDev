<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Nivel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Desenvolvedor>
 */
class DesenvolvedorFactory extends Factory
{

    protected $model = \App\Models\Desenvolvedor::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'nome' => $this->faker->name,
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'data_nascimento' => $this->faker->date(),
            'hobby' => $this->faker->sentence,
            'nivel_id' => Nivel::factory(),
        ];
    }
}
