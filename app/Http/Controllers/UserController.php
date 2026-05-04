<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return 'Lista task';
    }
    public function create()
    {
        return 'Form per creare task';
    }
    public function store(Request $request)
    {
        return 'Salvataggio task';
    }
    public function edit($id)
    {
        return "Modifica task $id";
    }
    public function update(Request $request, $id)
    {
        return "Aggiornamento task $id";
    }
    public function destroy($id)
    {
        return "Cancellazione task $id";
    }}
