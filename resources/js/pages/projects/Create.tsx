import { Form, Link, useForm } from '@inertiajs/react';

export default function Create({ teams }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        team_id: '',
        name: '',
        description: '',
        status: 'active',
        due_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/projects', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create Project</h1>
            <Link href='/progetti' className="text-blue-500">
                ← Back
            </Link>
            <Form onSubmit={handleSubmit} className="space-y-4">
                <select
                    value={data.team_id}
                    onChange={(e) => setData('team_id', e.target.value)}
                    className="border p-2"
                    required
                >
                    <option value="">Select a team</option>
                    {teams.map((t: any) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>
                {errors.team_id && <div className="text-red-500 text-sm">{errors.team_id}</div>}

                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="border p-2 w-full"
                    placeholder="Project name"
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="border p-2 w-full"
                    placeholder="Description"
                />
                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}

                <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="border p-2"
                >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                </select>
                {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}

                <input
                    type="date"
                    value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)}
                    className="border p-2"
                />
                {errors.due_date && <div className="text-red-500 text-sm">{errors.due_date}</div>}

                <button type="submit" className="bg-green-500 text-white px-4 py-2" disabled={processing}>
                    {processing ? 'Creating...' : 'Create'}
                </button>

                <Link href="/projects" className="ml-4 text-gray-500">
                    Cancel
                </Link>
            </Form>
        </div>
    );
}