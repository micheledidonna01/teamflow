import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ users, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    // Logica di ricerca con "debounce" (scatta dopo 300ms che hai smesso di scrivere)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get('/admin/users', { search: search }, { 
                preserveState: true, 
                replace: true 
            });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className="p-8">
            <Head title="Cerca Utenti" />
            
            <h1 className="text-2xl font-bold mb-6">Cerca Utenti</h1>


            {/* RISULTATI */}
            <div className="grid gap-4">
                {users.data.length === 0 ? (
                    <p className="text-gray-500">Nessun utente trovato.</p>
                ) : (
                    users.data.map((user: any) => (
                        <Link 
                            key={user.id} 
                            href={`/admin/users/${user.id}`}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition flex justify-between items-center"
                        >
                            <div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <span className="text-blue-500">Vedi profilo →</span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
