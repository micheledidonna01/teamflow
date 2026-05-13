import { Link, usePage, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

interface Team {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    description: string | null;
    status: 'active' | 'paused' | 'completed';
    due_date: string | null;
    team: Team;
}

interface PageProps {
    projects: Project[];
}

export default function Index() {
    const { projects }: PageProps = usePage().props as any;

    // modali distinte
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // form per creazione
    const createForm = useForm({
        name: '',
        description: '',
        status: 'active',
        due_date: '',
    });

    // form per modifica
    const editForm = useForm({
        name: '',
        description: '',
        status: 'active',
        due_date: '',
    });

    // apre modale nuova
    const openCreate = () => {
        createForm.reset();
        setCreateModal(true);
    };

    // apre modale modifica
    const openEdit = (project: Project) => {
        setSelectedProject(project);
        editForm.setData({
            name: project.name,
            description: project.description ?? '',
            status: project.status,
            due_date: project.due_date ?? '',
        });
        setEditModal(true);
    };

    // elimina progetto
    const handleDelete = (id: number) => {
        if (confirm('Vuoi davvero eliminare questo progetto?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <div className="p-8 space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Progetti</h1>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    + Nuovo progetto
                </button>
            </div>

            {/* LISTA PROGETTI */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.length === 0 && (
                    <div className="col-span-full text-gray-500 italic">
                        Nessun progetto disponibile.
                    </div>
                )}
                {projects.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {p.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Team: {p.team?.name ?? '—'}
                                <br />
                                Stato: {p.status} | Scadenza: {p.due_date ?? '—'}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end gap-3 text-sm">
                            <Link
                                href={`/admin/projects/${p.id}`}
                                className="text-green-600 hover:underline font-medium"
                            >
                                Apri
                            </Link>
                            <button
                                onClick={() => openEdit(p)}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Modifica
                            </button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-500 hover:underline font-medium"
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
                            Nuovo Progetto
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                createForm.post('/admin/projects', {
                                    onSuccess: () => setCreateModal(false),
                                });
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Nome progetto"
                                required
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full focus:ring focus:ring-blue-400"
                            />

                            <textarea
                                value={createForm.data.description}
                                onChange={(e) => createForm.setData('description', e.target.value)}
                                placeholder="Descrizione"
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full"
                                rows={3}
                            />

                            <div className="flex gap-2">
                                <select
                                    value={createForm.data.status}
                                    onChange={(e) =>
                                        createForm.setData(
                                            'status',
                                            e.target.value as 'active' | 'paused' | 'completed'
                                        )
                                    }
                                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/2"
                                >
                                    <option value="active">Attivo</option>
                                    <option value="paused">In pausa</option>
                                    <option value="completed">Completato</option>
                                </select>

                                <input
                                    type="date"
                                    value={createForm.data.due_date ?? ''}
                                    onChange={(e) => createForm.setData('due_date', e.target.value)}
                                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/2"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setCreateModal(false)}
                                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                                >
                                    Crea
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODALE MODIFICA */}
            {editModal && selectedProject && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-lg"
                    >
                        <button
                            onClick={() => setEditModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Modifica Progetto
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                editForm.put(`/admin/projects/${selectedProject.id}`, {
                                    onSuccess: () => setEditModal(false),
                                });
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                placeholder="Nome progetto"
                                required
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full focus:ring focus:ring-green-400"
                            />

                            <textarea
                                value={editForm.data.description}
                                onChange={(e) => editForm.setData('description', e.target.value)}
                                placeholder="Descrizione"
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full"
                                rows={3}
                            />

                            <div className="flex gap-2">
                                <select
                                    value={editForm.data.status}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'status',
                                            e.target.value as 'active' | 'paused' | 'completed'
                                        )
                                    }
                                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/2"
                                >
                                    <option value="active">Attivo</option>
                                    <option value="paused">In pausa</option>
                                    <option value="completed">Completato</option>
                                </select>

                                <input
                                    type="date"
                                    value={editForm.data.due_date ?? ''}
                                    onChange={(e) => editForm.setData('due_date', e.target.value)}
                                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/2"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setEditModal(false)}
                                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                                >
                                    Salva modifiche
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
