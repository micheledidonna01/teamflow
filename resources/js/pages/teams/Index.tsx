import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

interface TeamCreator {
    id: number;
    name: string;
    email: string;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
    creator?: TeamCreator;
}

interface TeamMember {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PageProps {
    team?: Team;        
    auth: any;
    teams?: Team[];        
    usersOfTeam?: TeamMember[]; 
    [key: string]: any;
}

export default function Index() {
    const { teams }: PageProps = usePage().props;
    console.log(teams);
    const { auth } = usePage().props;
    const user = auth.user;
    // Modali
    const [createModal, setCreateModal] = useState(false);

    // Form creazione
    const createForm = useForm({
        name: '',
        description: '',
    });

    // Elimina team
    const handleDelete = (id: number) => {
        if (confirm('Vuoi davvero eliminare questo team?')) {
            router.delete(`/admin/teams/${id}`);
        }
    };

    return <>
        <Head title="Teams" />
        <div className="p-8 space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Teams
                    </h1>
                    {user && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                            Benvenuto, {user.name}
                        </p>
                    )}
                </div>
                <Link
                    href="/admin/teams/create" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    + Nuovo Team
                </Link>
            </div>

            {/* LISTA TEAMS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams?.length === 0 && (
                    <div className="col-span-full text-gray-500 dark:text-gray-400 italic text-center py-12">
                        Nessun team disponibile.
                    </div>
                )}
                {teams?.map((team) => (
                    <div
                        key={team.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {team.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                {team.description ?? '—'}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                Creato il {new Date(team.created_at).toLocaleDateString('it-IT')}
                                <br />
                                da:<Link href={`/admin/users/${team.created_by}`} className="text-blue-600 hover:underline dark:text-blue-400"> {team.creator?.name ?? '—'}</Link>
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end gap-3 text-sm">
                            <Link
                                href={`/admin/teams/${team.id}`}
                                className="text-green-600 hover:underline font-medium dark:text-green-400"
                            >
                                Apri
                            </Link>
                            <button
                                onClick={() => handleDelete(team.id)}
                                className="text-red-500 hover:underline font-medium dark:text-red-400"
                            >
                                Elimina
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODALE CREAZIONE */}
            {createModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-lg"
                    >
                        <button
                            onClick={() => setCreateModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Nuovo Team
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                createForm.post('/admin/teams', {
                                    onSuccess: () => setCreateModal(false),
                                });
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Nome team"
                                required
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                            />

                            <textarea
                                value={createForm.data.description}
                                onChange={(e) => createForm.setData('description', e.target.value)}
                                placeholder="Descrizione (opzionale)"
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                                rows={3}
                            />

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setCreateModal(false)}
                                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md transition"
                                >
                                    Crea
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    </>;
}