<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /* VISUALIZZA */
    public function index(){
        $projects = Project::with('team')->get();
        return Inertia::render('projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function show(Project $project)
    {
        $project->load([
            'tasks',
            'team.owner'
        ]);

        return Inertia::render('projects/Show', [
            'project' => $project,
            'tasks'   => $project->tasks,
            'team'    => $project->team,
            'owner'   => $project->team->owner,
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
