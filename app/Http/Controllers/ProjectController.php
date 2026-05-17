<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /* VISUALIZZA */
    public function index()
    {
        // Recuperiamo i progetti filtrando per i team dell'utente
        $projects = Project::with('team')
            ->whereIn('team_id', auth()->user()->teams->pluck('id'))
            ->get();

        return Inertia::render('projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function show(Project $project)
    {
        // Verifichiamo che l'utente appartenga al team del progetto
        if (!auth()->user()->teams->contains($project->team_id)) {
            abort(403, 'Non hai i permessi per visualizzare questo progetto.');
        }

        $project->load([
            'tasks',
            'team.creator' // Nota: usa 'creator' se è il nome della relazione definita prima
        ]);

        return Inertia::render('projects/Show', [
            'project' => $project,
            'tasks'   => $project->tasks,
            'team'    => $project->team,
            'owner'   => $project->team->creator, // O 'owner' se hai quel nome nel modello
        ]);
    }




    public function create()
    {
        $teams = Team::all();
        return Inertia::render('projects/Create', [
            'teams' => $teams,
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,paused,completed',
            'due_date' => 'nullable|date'
        ]);
        Project::create($data);
        return redirect()->route('projects.Index');
    }


    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project->load('team'),
            'teams' => Team::all(),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,paused,completed',
            'due_date' => 'nullable|date',
        ]);

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted');
    }
}
