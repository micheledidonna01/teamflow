import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { projects } = usePage().props;
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <Link href="/projects/create" className="text-blue-500">
                + New Project
            </Link>
            <ul className="mt-4">
                {projects.map((p: any) => (
                    <li key={p.id} className="flex justify-between border-b py-2">
                        <div>
                            <strong>{p.name}</strong> — <span>{p.status}</span>
                            <div className="text-sm text-gray-500">Team: {p.team?.name}</div>
                        </div>
                        <div className="flex space-x-2">
                            <Link href={`/projects/${p.id}`} className="text-green-600">View</Link>
                            <Link href={`/projects/${p.id}/Edit`} className="text-blue-600">Edit</Link>
                            <Link
                                href={`/projects/${p.id}`}
                                method="delete"
                                as="button"
                                className="text-red-500"
                            >
                                Delete
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
