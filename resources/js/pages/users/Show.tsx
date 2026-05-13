import { Head, Link } from '@inertiajs/react';

export default function Show({ user }: any) {
    return (
        <div className="p-8">
            <Head title={`Profilo di ${user.name}`} />

            <Link href="/admin/users" className="text-blue-500 mb-4 inline-block">← Torna alla ricerca</Link>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Team di cui fa parte:</h2>
                <div className="grid gap-2">
                    {user.teams?.map((team: any) => (
                        <div key={team.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                            {team.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
