import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Task {
    id: number;
    title: string;
    description: string | null;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in_progress' | 'done';
    due_date: string | null;
    assigned_to?: number | null;
    user?: User | null;
}

interface Team {
    id: number;
    name: string;
    description: string | null;
}

interface Project {
    id: number;
    name: string;
    description: string | null;
    status: string;
    due_date: string | null;
    team: Team;
    tasks: Task[];
}

interface PageProps {
    project: Project;
    tasks: Task[];
    team: Team;
}

export default function Show() {
    const { project, tasks }: PageProps = usePage().props as any;
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const { data, setData, post, put, delete: destroy, reset } = useForm<Task>({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        due_date: '',
    } as any);

    const closeModal = () => {
        setShowModal(false);
        setSelectedTask(null);
        reset();
    };

    const openNew = () => {
        setSelectedTask(null);
        setShowModal(true);
    };

    const openEdit = (task: Task) => {
        setSelectedTask(task);
        setData({
            title: task.title,
            description: task.description ?? '',
            priority: task.priority,
            status: task.status,
            due_date: task.due_date ?? '',
        } as any);
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedTask) {
            put(`/admin/projects/${project.id}/tasks/${selectedTask.id}`, {
                onSuccess: closeModal,
            });
        } else {
            post(`/admin/projects/${project.id}/tasks`, {
                onSuccess: closeModal,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Vuoi davvero eliminare questa task?')) {
            destroy(`/admin/projects/${project.id}/tasks/${id}`);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {project.name}
                </h1>
                <p className="text-gray-500">Team: {project.team?.name ?? '—'}</p>
                <p className="text-gray-400 text-sm">Scadenza: {project.due_date ?? '—'}</p>
            </header>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Tasks
                </h2>
                <button
                    onClick={openNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    + Nuova Task
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.length === 0 && (
                    <div className="text-gray-500 italic col-span-full">
                        Nessuna task per questo progetto.
                    </div>
                )}

                {tasks.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                        onClick={() => openEdit(t)}
                    >
                        <div>
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                {t.title}
                            </h3>
                            <p className="text-sm text-gray-500">{t.status}</p>
                            <p className="mt-1 text-sm text-gray-500">
                                Priorità: <span className="font-medium">{t.priority}</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Scadenza: {t.due_date ?? '—'}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(t.id);
                                }}
                                className="text-red-500 hover:text-red-600 text-sm"
                            >
                                Elimina
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div
                        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            {selectedTask ? 'Modifica Task' : 'Nuova Task'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Titolo"
                                className="border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                                required
                            />

                            <textarea
                                value={data.description ?? ''}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Descrizione"
                                className="border border-gray-300 dark:border-gray-700 bg-transparent rounded-md p-2 w-full"
                                rows={3}
                            />

                            <div className="flex gap-2">
                                <select
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value as any)}
                                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/2"
                                >
                                    <option value="low">Bassa</option>
                                    <option value="medium">Media</option>
                                    <option value="high">Alta</option>
                                </select>

                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as any)}
                                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-1/2"
                                >
                                    <option value="todo">Da fare</option>
                                    <option value="in_progress">In corso</option>
                                    <option value="done">Completata</option>
                                </select>
                            </div>

                            <input
                                type="date"
                                value={data.due_date ?? ''}
                                onChange={(e) => setData('due_date', e.target.value)}
                                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full"
                            />

                            <div className="pt-3 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                                >
                                    {selectedTask ? 'Salva modifiche' : 'Crea Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
