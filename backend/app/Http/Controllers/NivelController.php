<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNivelRequest;
use App\Http\Requests\UpdateNivelRequest;
use App\Models\Nivel;
use App\Http\Resources\NivelResource;

class NivelController extends Controller
{
    /**
     * Resposta de Sucesso (200): Retorna a lista de níveis existentes.
     * Resposta de Erro (404): Retorna se não houver nenhum nível cadastrado.
     */
    public function index()
    {
        if(Nivel::count() == 0) {
            return response()->json(['message' => 'Nenhum nível cadastrado'], 404);
        }
        
        return NivelResource::collection(Nivel::all())
            ->response()
            ->setStatusCode(200);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNivelRequest $request)
    {
        $nivel = Nivel::create($request->validated());
        return new NivelResource($nivel);
    }

    /**
     * Display the specified resource.
     */
    public function show(Nivel $nivei)
    {
        return new NivelResource($nivei);
    }

     /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNivelRequest $request, Nivel $nivei)
    {
        $nivei->update($request->validated());
        return new NivelResource($nivei);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nivel $nivei)
    {
        if($nivei->desenvolvedores->count() > 0) {
            return response()->json(['message' => 'Nível não pode ser excluído, pois está associado a um ou mais desenvolvedores'], 400);
        }
        
        try {
            $nivei->delete();
            return response()->json(['message' => 'Nível excluído com sucesso'], 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao excluir nível'], 400);
        }
    }
}
