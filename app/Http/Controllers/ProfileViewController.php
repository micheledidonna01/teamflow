<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileViewController extends Controller
{
    public function show(Request $request)
    {
        $user = auth()->user()->load([
            'teams.projects',
            'teams.users'
        ]);

        $activeTasks = $user->tasks()
            ->where('status', '!=', 'completed')
            ->with('project')
            ->get();

        return Inertia::render('profile/Show', [
            'user' => $user,
            'activeTasks' => $activeTasks
        ]);
    }
}
