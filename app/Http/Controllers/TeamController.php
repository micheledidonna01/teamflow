<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $teams = Team::with(['creator', 'projects'])
            ->where('created_by', $userId) // Team creati da me
            ->orWhereHas('users', function ($query) use ($userId) {
                $query->where('users.id', $userId); // Team di cui faccio parte (pivot)
            })
            ->get();

        return Inertia::render('teams/Index', [
            'teams' => $teams,
        ]);
    }



    // public function show($id)
    // {
    //     $teamSingle = Team::findOrFail($id);
    //     $team = $teamSingle->load('projects');

    //     return Inertia::render('teams/Show', [
    //         'team' => Team::findOrFail($id)->select('teams.*', 'users.name as creator_name', 'users.email as creator_email')
    //         ->leftJoin('users', 'teams.created_by', '=', 'users.id')
    //         ->with('projects')
    //         ->get(),
    //     ]);
    // }

    public function show($id)
    {
        // 1. Recuperiamo il team con il suo creatore e i progetti (usando Eloquent per le relazioni annidate)
        $team = Team::with(['creator:id,name,email', 'projects'])->findOrFail($id);

        // 2. Recuperiamo i membri del team usando i JOIN
        $usersOfTeam = User::
            select(
                'users.id',
                'users.name',
                'users.email',
                'team_user.role as role' // Recuperiamo il ruolo dalla tabella pivot
            )
            ->join('team_user', 'users.id', '=', 'team_user.user_id')
            ->where('team_user.team_id', $id)
            ->get();

        // 3. Aggiungiamo i campi piatti richiesti
        $team->creator_name = $team->creator?->name;
        $team->creator_email = $team->creator?->email;

        return Inertia::render('teams/Show', [
            'team' => $team,
            'usersOfTeam' => $usersOfTeam,
        ]);
    }




    public function create()
    {
        $teams = Team::all();
        return Inertia::render('teams/Create', [
            'teams' => $teams,
            'user_id' => auth()->id(),

        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // 1. Crea il team (tabella 'teams')
        $team = Team::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'created_by' => auth()->id(), // L'utente corrente è il proprietario
        ]);

        // 2. Aggiungi l'utente alla tabella pivot ('team_user') con il ruolo 'lead'
        $team->users()->attach(auth()->id(), [
            'role' => 'lead'
        ]);

        return redirect()->route('teams.index')->with('success', 'Team creato e ruolo assegnato!');
    }

    public function edit($id)
    {
    

        $team = Team::with(['creator:id,name,email', 'projects'])->findOrFail($id);

        // 2. Recuperiamo i membri del team usando i JOIN
        $usersOfTeam = User::select(
                'users.id',
                'users.name',
                'users.email',
                'team_user.role as role' // Recuperiamo il ruolo dalla tabella pivot
            )
            ->join('team_user', 'users.id', '=', 'team_user.user_id')
            ->where('team_user.team_id', $id)
            ->get();

        // 3. Aggiungiamo i campi piatti richiesti
        $team->creator_name = $team->creator?->name;
        $team->creator_email = $team->creator?->email;

        return Inertia::render('teams/Edit', [
            'team' => $team,
            'usersOfTeam' => $usersOfTeam,
        ]);
    }
    public function update(Request $request, $id) // Usa $id invece di Team $team
    {
        $team = Team::findOrFail($id); // Trova il team manualmente

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
        ]);

        $team->update($data);

        return redirect()->route('teams.show', $team->id)->with('success', 'Team aggiornato con successo!');
    }

    public function destroy($id)
    {
        Team::findOrFail($id)->delete();
        return redirect()->route('teams.index');
    }
}
