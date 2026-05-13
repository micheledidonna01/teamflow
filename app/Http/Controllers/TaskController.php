<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index($projectId)
    {
        $project = Project::with('tasks.user')->findOrFail($projectId);

        return Inertia::render('Tasks/Index', [
            'project' => $project,
            'tasks' => $project->tasks,
        ]);
    }

    public function create($projectId)
    {
        $project = Project::findOrFail($projectId);
        return Inertia::render('Tasks/Create', [
            'project' => $project,
        ]);
    }

    public function edit($projectId, $taskId)
    {
        $task = Task::findOrFail($taskId);
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projectId' => $projectId,
        ]);
    }

    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in_progress,done',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);
        $project->tasks()->create($data);
        // 👉 rimanda alla pagina del progetto
        return redirect()->route('projects.show', $projectId)
            ->with('success', 'Task aggiunta con successo');
    }
    public function update(Request $request, $projectId, $taskId)
    {
        $task = Task::findOrFail($taskId);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in_progress,done',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);
        $task->update($data);
        return redirect()->route('projects.show', $projectId)
            ->with('success', 'Task aggiornata correttamente');
    }
    public function destroy($projectId, $taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();
        return redirect()->route('projects.show', $projectId)
            ->with('success', 'Task eliminata correttamente');
    }
}
