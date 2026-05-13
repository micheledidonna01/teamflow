<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('users/Index', [
            'users' => $users,
            'filters' => $request->only(['search']) // Rimanda indietro il testo cercato
        ]);
    }

    public function show($id)
    {
        // Carichiamo l'utente con i suoi team per un profilo completo
        $user = User::with('teams')->findOrFail($id);

        return Inertia::render('users/Show', [
            'user' => $user
        ]);
    }

}

