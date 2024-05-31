<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDesenvolvedorRequest;
use App\Http\Requests\UpdateDesenvolvedorRequest;
use App\Models\Desenvolvedor;
use App\Http\Resources\DesenvolvedorResource;

class DesenvolvedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Desenvolvedor::count() == 0) {
            return response()->json(['message' => 'Nenhum desenvolvedor cadastrado'], 404);
        }

        return DesenvolvedorResource::collection(Desenvolvedor::all())
            ->response()
            ->setStatusCode(200);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDesenvolvedorRequest $request)
    {
        $desenvolvedor = Desenvolvedor::create($request->validated());
        return new DesenvolvedorResource($desenvolvedor);
    }

    
    public function show(Desenvolvedor $desenvolvedore)
    {
        return new DesenvolvedorResource($desenvolvedore);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDesenvolvedorRequest $request, Desenvolvedor $desenvolvedore)
    {
        $updated = $desenvolvedore->update($request->validated());
        if(!$updated) {
            return response()->json(['message' => 'Erro ao atualizar desenvolvedor'], 400);
        }
        $dev = Desenvolvedor::find($desenvolvedore->id);
        return new DesenvolvedorResource($dev);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Desenvolvedor $desenvolvedore)
    {
        try{
            $desenvolvedore->delete();
            return response()->json(['message' => 'Desenvolvedor removido com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao remover desenvolvedor'], 400);
        }    
    }
}
