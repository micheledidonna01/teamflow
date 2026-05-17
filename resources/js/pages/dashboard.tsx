// import { Head, Link } from '@inertiajs/react';
// import {
//     LayoutDashboard,
//     FolderDot,
//     CheckCircle2,
//     Users2,
//     Clock,
//     ArrowRight,
//     Plus
// } from 'lucide-react';

// interface Project {
//     id: number;
//     name: string;
//     description: string;
//     status: 'active' | 'paused' | 'completed';
//     team?: { name: string };
//     created_at: string;
// }

// interface Team {
//     id: number;
//     name: string;
//     description: string;
//     creator?: { name: string };
//     created_at: string;
// }

// interface DashboardProps {
//     recentProjects: Project[];
//     newTeams: Team[];
//     stats: {
//         active_projects: number;
//         completed_projects: number;
//         total_teams: number;
//     };
// }

// export default function Dashboard({ recentProjects, newTeams, stats }: DashboardProps) {
//     return (
//         <div className="p-8 w-full space-y-8 bg-gray-50/50 dark:bg-transparent min-h-screen">
//             <Head title="Dashboard" />

//             {/* HEADER DASHBOARD */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
//                         <LayoutDashboard className="h-8 w-8 text-blue-600" />
//                         Dashboard
//                     </h1>
//                     <p className="text-gray-500 dark:text-gray-400 mt-1">
//                         Panoramica delle attività e dei team.
//                     </p>
//                 </div>
//                 <div className="flex gap-3">
//                     <Link
//                         href="/admin/teams/create"
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-sm"
//                     >
//                         <Plus className="h-4 w-4" /> Nuovo Team
//                     </Link>
//                 </div>
//             </div>

//             {/* STATISTICHE RAPIDE */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
//                     <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                         <FolderDot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Progetti Attivi</p>
//                         <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.active_projects}</p>
//                     </div>
//                 </div>

//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
//                     <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                         <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Completati</p>
//                         <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.completed_projects}</p>
//                     </div>
//                 </div>

//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
//                     <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                         <Users2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Totale Team</p>
//                         <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total_teams}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="grid lg:grid-cols-2 gap-8">
//                 {/* ULTIMI PROGETTI */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//                     <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
//                         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
//                             <Clock className="h-5 w-5 text-blue-500" /> Progetti Recenti
//                         </h2>
//                         <Link href="/admin/projects" className="text-sm text-blue-600 hover:underline">Vedi tutti</Link>
//                     </div>
//                     <div className="divide-y divide-gray-50 dark:divide-gray-700">
//                         {recentProjects.length > 0 ? (
//                             recentProjects.map((project) => (
//                                 <div key={project.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
//                                     <div className="flex justify-between items-start mb-2">
//                                         <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition">
//                                             {project.name}
//                                         </h3>
//                                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${project.status === 'active' ? 'bg-blue-100 text-blue-700' :
//                                                 project.status === 'completed' ? 'bg-green-100 text-green-700' :
//                                                     'bg-gray-100 text-gray-700'
//                                             }`}>
//                                             {project.status}
//                                         </span>
//                                     </div>
//                                     <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-3">
//                                         {project.description}
//                                     </p>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-xs text-gray-400">Team: {project.team?.name ?? 'N/D'}</span>
//                                         <Link href={`/admin/projects/${project.id}`} className="text-xs font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
//                                             Apri <ArrowRight className="h-3 w-3" />
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="p-10 text-center text-gray-500 italic">Nessun progetto recente.</div>
//                         )}
//                     </div>
//                 </div>

//                 {/* NUOVI TEAM */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//                     <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
//                         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
//                             <Users2 className="h-5 w-5 text-purple-500" /> Nuovi Team
//                         </h2>
//                         <Link href="/admin/teams" className="text-sm text-purple-600 hover:underline">Tutti i team</Link>
//                     </div>
//                     <div className="divide-y divide-gray-50 dark:divide-gray-700">
//                         {newTeams.length > 0 ? (
//                             newTeams.map((team) => (
//                                 <Link
//                                     key={team.id}
//                                     href={`/admin/teams/${team.id}`}
//                                     className="p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
//                                 >
//                                     <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
//                                         {team.name.charAt(0)}
//                                     </div>
//                                     <div className="flex-1">
//                                         <h3 className="font-semibold text-gray-900 dark:text-gray-100">{team.name}</h3>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                                             Creato da: {team.creator?.name ?? 'Admin'} • {new Date(team.created_at).toLocaleDateString('it-IT')}
//                                         </p>
//                                     </div>
//                                     <ArrowRight className="h-4 w-4 text-gray-300" />
//                                 </Link>
//                             ))
//                         ) : (
//                             <div className="p-10 text-center text-gray-500 italic">Nessun team creato di recente.</div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    CheckCircle,
    Users,
    TrendingUp,
    Clock,
    ExternalLink,
    ShieldCheck
} from 'lucide-react';

export default function Dashboard({ recentProjects, newTeams, stats }: any) {
    return (
        <div className="p-8 space-y-8 bg-slate-50/50 dark:bg-transparent min-h-screen">
            <Head title="Admin Overview" />

            {/* HEADER GLOBALE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                        <ShieldCheck className="h-9 w-9 text-indigo-600" />
                        Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                    
                    </p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="px-4 py-2 text-sm font-bold text-indigo-600 border-r border-slate-100 dark:border-slate-700">
                        Live Stats
                    </div>
                    <div className="px-4 py-2 text-sm text-slate-500">
                        Aggiornato: {new Date().toLocaleTimeString('it-IT')}
                    </div>
                </div>
            </div>

            {/* GRID STATISTICHE GLOBALI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Progetti Attivi', value: stats.active_projects, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Completati', value: stats.completed_projects, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    { label: 'Team Totali', value: stats.total_teams, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                    { label: 'Utenti Iscritti', value: stats.total_users, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                        <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-indigo-500" /> Attività Progetti Globale
                        </h2>
                        <Link href="/admin/projects" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">
                            Gestisci Progetti →
                        </Link>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Progetto</th>
                                    <th className="px-6 py-4 font-bold">Team</th>
                                    <th className="px-6 py-4 font-bold">Stato</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                                {recentProjects.map((project: any) => (
                                    <tr key={project.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition">
                                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{project.name}</td>
                                        <td className="px-6 py-4 text-slate-500">{project.team?.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${project.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/projects/${project.id}`} className="text-slate-400 hover:text-indigo-600">
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ULTIMI TEAM CREATI (1 colonna) */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
                    <div className="p-6 border-b border-slate-50 dark:border-slate-700">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-500" /> Nuovi Team
                        </h2>
                    </div>
                    <div className="flex-1 p-6 space-y-6">
                        {newTeams.map((team: any) => (
                            <div key={team.id} className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center font-black text-slate-500">
                                    {team.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900 dark:text-white leading-tight">{team.name}</p>
                                    <p className="text-xs text-slate-400">Creato da {team.creator?.name ?? 'Admin'}</p>
                                </div>
                                <Link href={`/admin/teams/${team.id}`} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition">
                                    <ExternalLink className="h-4 w-4 text-slate-300" />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 rounded-b-2xl">
                        <Link href="/admin/teams" className="block text-center text-sm font-bold text-slate-600 hover:text-indigo-600">
                            Visualizza tutti i team
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
