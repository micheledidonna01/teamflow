import { usePage } from '@inertiajs/react';

export default function Show() {
    const { project, tasks, team, owner } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-500">Team: {team.name}</p>
            <p className="text-gray-500 mb-4">Owner: {owner.name}</p>

            <h2 className="text-xl font-semibold border-b pb-2 mt-6">Tasks</h2>
            <ul className="mt-2">
                {tasks.length === 0 && <li>Nessuna task per questo progetto.</li>}
                {tasks.map((t: any) => (
                    <li key={t.id} className="border-b py-2">
                        <span className="font-medium">{t.title}</span> – {t.status}
                        <br />
                        <small className="text-gray-500">
                            Priorità: {t.priority} | Scadenza: {t.due_date || '—'}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
