<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Desenvolvedor;

class DesenvolvedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(Desenvolvedor::count() == 0) {
            Desenvolvedor::factory(4)
            ->forNivel([
                'nivel' => 'Junior'
            ])
            ->create();

            Desenvolvedor::factory(3)
            ->forNivel([
                'nivel' => 'Pleno'
            ])
            ->create();

            Desenvolvedor::factory(3)
            ->forNivel([
                'nivel' => 'Senior'
            ])
            ->create();
        }
    }
}
