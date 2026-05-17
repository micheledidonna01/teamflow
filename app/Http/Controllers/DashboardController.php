<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Prende i 5 progetti più recenti di tutta la piattaforma
        $recentProjects = Project::with('team')->latest()->take(5)->get();

        // Prende gli ultimi 5 team creati globalmente
        $newTeams = Team::with('creator')->latest()->take(5)->get();

        // Statistiche globali
        $stats = [
            'active_projects'    => Project::where('status', 'active')->count(),
            'completed_projects' => Project::where('status', 'completed')->count(),
            'total_teams'        => Team::count(),
            'total_users'        => \App\Models\User::count(), // Aggiungiamo anche il totale utenti
        ];

        return Inertia::render('dashboard', [
            'recentProjects' => $recentProjects,
            'newTeams'       => $newTeams,
            'stats'          => $stats,
        ]);
    }
}
