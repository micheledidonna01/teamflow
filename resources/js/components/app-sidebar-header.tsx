import { Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useDeferredValue } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    // 1. Recuperiamo i dati condivisi (allUsers deve essere in HandleInertiaRequests)
    const { allUsers } = usePage().props as any;
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Chiudi i risultati se clicchi fuori
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const deferredSearch = useDeferredValue(search);

    // Filtriamo gli utenti localmente per il dropdown rapido
    const filteredUsers = useMemo(() => {
        if (deferredSearch.length <= 1){
            return [];
        }
        
        const term = deferredSearch.toLowerCase();

        return allUsers
            ?.filter((u: any) =>
                u.name.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term)
            )
            .slice(0, 5);
    }, [deferredSearch, allUsers]);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 w-full">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                {/* CONTENITORE RICERCA */}
                <div className="relative ml-auto w-full max-w-md" ref={searchRef}>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cerca utenti..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShowResults(true);
                            }}
                            className="w-full border border-gray-200 dark:border-gray-700 rounded-full pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white outline-none transition-all"
                        />
                    </div>

                    {/* DROPDOWN RISULTATI RAPIDI */}
                    {showResults && search.length > 1 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                            {filteredUsers.length > 0 ? (
                                <>
                                    <div className="p-2">
                                        {filteredUsers.map((user: any) => (
                                            <Link
                                                key={user.id}
                                                href={`/admin/users/${user.id}`}
                                                onClick={() => setShowResults(false)}
                                                className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                                            >
                                                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-xs font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium dark:text-white">{user.name}</span>
                                                    <span className="text-[10px] text-gray-500">{user.email}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/admin/users?search=${search}`}
                                        className="block p-2 text-center text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-t border-gray-100 dark:border-gray-700"
                                    >
                                        Vedi tutti i risultati
                                    </Link>
                                </>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">Nessun utente trovato</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
