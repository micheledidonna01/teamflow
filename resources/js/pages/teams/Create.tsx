import { Link } from '@inertiajs/react';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect } from 'react';

interface PageProps {
    teams: any[]; // Dal controller
    user_id: number;
}

export default function Create({ teams , user_id}: PageProps) {
    const id = user_id;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        created_by: id,
    });
    console.log(data);
    console.log(id);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/teams');
    };

    useEffect(() => {
        if (teams.length === 0) {
            router.visit('/admin/teams'); // URL diretto
        }
    }, []);


    return (
        <div className="p-8 max-w-2xl">
            <Head title="Nuovo Team" />

            <div className="mb-8">
                <Link
                    href="/admin/teams"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 inline-flex items-center"
                >
                    ← Torna ai teams
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Nuovo Team
                </h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nome *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Nome del team"
                            required
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Descrizione
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Descrizione opzionale..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>


                    <div className="flex justify-end space-x-3 pt-4">
                        <Link
                            href="/admin/teams"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            Annulla
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md font-medium transition"
                        >
                            {processing ? 'Creazione...' : 'Crea Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}