import { useForm, Link } from '@inertiajs/react';

export default function Edit({ project, teams }) {
    const { data, setData, put } = useForm({
        team_id: project.team_id,
        name: project.name,
        description: project.description || '',
        status: project.status,
        due_date: project.due_date || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/projects/${project.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    value={data.team_id}
                    onChange={(e) => setData('team_id', e.target.value)}
                    className="border p-2"
                    required
                >
                    {teams.map((t: any) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="border p-2 w-full"
                />

                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="border p-2 w-full"
                />

                <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="border p-2"
                >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                </select>

                <input
                    type="date"
                    value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)}
                    className="border p-2"
                />

                <button type="submit" className="bg-green-500 text-white px-4 py-2">
                    Update
                </button>
                <Link href="/projects" className="ml-4 text-gray-500">Cancel</Link>
            </form>
        </div>
    );
}
