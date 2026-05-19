// resources/js/pages/admin/ProfileShow.tsx
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Users, CheckCircle2, Cog, User } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    teams: Array<{
        id: number;
        name: string;
        description?: string;
        users: any[];
        projects: Array<{
            id: number;
            name: string;
            description?: string;
        }>;
    }>;
    tasks: any[];
}

interface PageProps {
    user: User;
    activeTasks: Array<{
        id: number;
        title: string;
        status: string;
        project: { name: string };
    }>;
    flash?: { success?: string; error?: string };
    [key: string]: any;
}

export default function ProfileShow({ user, activeTasks }: PageProps) {
    const { flash } = usePage().props as any;

    const { data, setData, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    // const submit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     put(route('profile.show'), {
    //         preserveScroll: true,
    //         onSuccess: () => { },
    //     });
    // };

    return (
        <div className="p-8 space-y-8">
            <Head title="Il Mio Profilo" />

            {/* HEADER CON ROTELLINA IMPOSTAZIONI */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {user.name}
                        </h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* 🔧 ROTELLINA IMPOSTAZIONI */}
                <Link
                    href={`/settings`} //`route('settings.edit')}
                    className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm group"
                    title="Impostazioni Account"
                >
                    <Cog className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 transition" />
                </Link>
            </div>

            {flash?.success && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg border border-green-200">
                    {flash.success}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* COLONNA SINISTRA: NOME ED EMAIL */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-400" />
                            Info Personali
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    disabled
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900 px-3 py-2"
                                />
    
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    disabled
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-900 px-3 py-2"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLONNA DESTRA: ATTIVITÀ E TEAM */}
                <div className="lg:col-span-2 space-y-6">
                    {/* TASK ATTIVE */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Le Mie Task Attive
                        </h2>
                        <div className="space-y-3">
                            {activeTasks.length > 0 ? (
                                activeTasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{task.title}</p>
                                            <p className="text-xs text-gray-500">
                                                Progetto: {task.project?.name || 'N/A'}
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded uppercase">
                                            {task.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic text-sm text-center py-4">
                                    Non hai task in sospeso. 🎉
                                </p>
                            )}
                        </div>
                    </div>

                    {/* I MIEI TEAM E PROGETTI */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-500" />
                            I Miei Team
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {user.teams.length > 0 ? (
                                user.teams.map((team) => (
                                    <div key={team.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                                        <p className="font-bold text-indigo-600">{team.name}</p>
                                        <p className="text-xs text-gray-500 mb-3">{team.users.length} membri</p>
                                        {team.projects.length > 0 && (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">Progetti:</p>
                                                {team.projects.map((project) => (
                                                    <Link
                                                        key={project.id}
                                                        href={`/admin/projects/${project.id}`} //`route('projects.show', project.id)}
                                                        className="block text-sm hover:underline text-gray-700 dark:text-gray-300"
                                                    >
                                                        • {project.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic text-sm text-center py-4">
                                    Non appartieni a nessun team.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}