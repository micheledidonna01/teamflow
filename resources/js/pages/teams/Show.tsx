import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

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
    role: string; // Il ruolo dalla tabella pivot
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    created_by: number;
    projects: Project[];
    creator: Creator;
}

interface Creator {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    team: Team;
    usersOfTeam: TeamMember[]; // Array dei membri
    [key: string]: any;
}

export default function Show({ team, usersOfTeam }: PageProps) {
    const { props } = usePage<PageProps>();
    const { flash } = props;

    return (
        <div className="p-8 w-full">
            <Head title={team.name} />

            {/* Success message */}
            {flash?.success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md shadow-sm">
                    {flash.success}
                </div>
            )}

            <div className="mb-8 flex justify-between items-center">
                <div>
                    <Link
                        href="/admin/teams"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 inline-flex items-center mb-2"
                    >
                        ← Tutti i teams
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {team.name}
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/admin/teams/${team.id}/edit`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition shadow-sm"
                    >
                        Modifica
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Dettagli Team */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <span>ℹ️</span> Dettagli
                    </h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="text-gray-500 dark:text-gray-400 block mb-1">Descrizione:</span>
                            <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                                {team.description ?? 'Nessuna descrizione fornita.'}
                            </p>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">Creato il:</span>
                            <span className="font-medium">{new Date(team.created_at).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">Creatore:</span>
                            <Link href={`/admin/users/${team.created_by}`} className="text-blue-600 hover:underline font-medium">
                                {team?.creator?.name ?? '—'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Membri del Team (Nuova Sezione) */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex justify-between items-center">
                        <span className="flex items-center gap-2">👥 Membri ({usersOfTeam?.length})</span>
                    </h2>
                    <div className="space-y-3">
                        {usersOfTeam?.length === 0 ? (
                            <p className="text-gray-500 italic text-center py-4">Nessun membro registrato.</p>
                        ) : (
                            usersOfTeam.map((member) => (
                                <Link
                                    href={`/admin/users/${member.id}`}
                                    key={member.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600"
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
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Progetti */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-gray-700 md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <span>📁</span> Progetti ({team.projects?.length})
                    </h2>
                    {team.projects?.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">Non ci sono progetti per questo team.</p>
                            <Link href={`/admin/projects/create`} className="inline-block px-6 py-2 rounded-md font-medium transition bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                Crea il primo progetto
                            </Link>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {team.projects?.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-sm transition"
                                >
                                    <span className="font-medium">{project.name}</span>
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                                    >
                                        Apri →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
