<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\{
    ProjectController,
    TaskController,
    TeamController,
    UserController
};
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard di default
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Management routes (Teams, Projects, Tasks, Users)
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->group(function () {

        // 🧩 TEAMS
        Route::controller(TeamController::class)
            ->prefix('teams')
            ->name('teams.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{team}', 'show')->name('show');
                Route::put('/{team}', 'update')->name('update');
                Route::delete('/{team}', 'destroy')->name('destroy');
            });

        // 🧩 PROJECTS
        Route::controller(ProjectController::class)
            ->prefix('projects')
            ->name('projects.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{project}', 'show')->name('show');
                Route::put('/{project}', 'update')->name('update');
                Route::delete('/{project}', 'destroy')->name('destroy');
            });

        // 🧩 TASKS
        Route::prefix('projects/{project}')
            ->name('projects.')
            ->group(function () {
                Route::controller(TaskController::class)
                    ->prefix('tasks')
                    ->name('tasks.')
                    ->group(function () {
                        Route::get('/', 'index')->name('index');
                        Route::get('/create', 'create')->name('create');
                        Route::post('/', 'store')->name('store');
                        Route::get('/{task}', 'show')->name('show');
                        Route::put('/{task}', 'update')->name('update');
                        Route::delete('/{task}', 'destroy')->name('destroy');
                    });
            });

        // 🧩 USERS
        Route::controller(UserController::class)
            ->prefix('users')
            ->name('users.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{user}', 'show')->name('show');
                Route::put('/{user}', 'update')->name('update');
                Route::delete('/{user}', 'destroy')->name('destroy');
            });
    });
});

require __DIR__ . '/settings.php';
