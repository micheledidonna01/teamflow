import { Head, Link, useForm } from '@inertiajs/react';

interface Project {
    id: number;
    name: string;
    description: string | null;
    status: 'active' | 'paused' | 'completed';
    due_date: string | null;
    team_id: number;
}

interface TeamMember {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    created_by: number;
    projects: Project[];
    creator: {
        id: number;
        name: string;
        email: string;
    };
}

interface PageProps {
    team: Team;
    usersOfTeam: TeamMember[];
}

export default function Edit({ team, usersOfTeam }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        id: team.id,
        name: team.name,
        description: team.description || '',
        created_by: team.created_by,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Invio dati...", data); // Controlla se vedi questo in console
        put(`/admin/teams/${team.id}`, {
            onSuccess: () => console.log("Successo!"),
            onError: (errors) => console.log("Errori:", errors),
        });
    };


    return (
        <div className="p-8 w-full">
            <Head title={`Modifica ${team.name}`} />

            <div className="mb-8 flex justify-between items-center">
                <div>
                    <Link
                        href={`/admin/teams/${team.id}`}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 inline-flex items-center mb-2"
                    >
                        ← Torna al team
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Modifica:
                        </h1>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-gray-100 p-0 w-auto"
                            required
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={submit}
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition shadow-sm disabled:opacity-50"
                    >
                        {processing ? 'Salvataggio...' : 'Salva Modifiche'}
                    </button>
                    <Link
                        href={`/admin/teams/${team.id}`}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition"
                    >
                        Annulla
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Dettagli Team (Editabili) */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <span>ℹ️</span> Dettagli
                    </h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="text-gray-500 dark:text-gray-400 block mb-1 font-bold uppercase text-[10px] tracking-widest">
                                Descrizione (Vecchia: {team.description ?? '—'})
                            </span>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900/50 p-3 rounded border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={4}
                                placeholder="Inserisci descrizione..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">Creato il:</span>
                            <span className="font-medium text-gray-400">{new Date(team.created_at).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">Creatore:</span>
                            <span className="text-gray-400 font-medium">{team?.creator?.name ?? '—'}</span>
                        </div>
                    </div>
                </div>

                {/* Membri del Team (Statici) */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex justify-between items-center">
                        <span className="flex items-center gap-2">👥 Membri ({usersOfTeam?.length})</span>
                    </h2>
                    <div className="space-y-3">
                        {usersOfTeam?.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 opacity-60"
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{member.email}</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${member.role === 'lead'
                                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                                    }`}>
                                    {member.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progetti (Statici) */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700 md:col-span-2 opacity-60">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <span>📁</span> Progetti ({team.projects?.length})
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.projects?.map((project) => (
                            <div
                                key={project.id}
                                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600"
                            >
                                <span className="font-medium">{project.name}</span>
                                <span className="text-gray-400 text-sm">Sola lettura</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
