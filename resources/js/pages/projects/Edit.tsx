import { useForm, Link, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PageProps {
    project: Project;
    teams: Team[];
}

interface Project {
    id: number;
    name: string;
    description: string | null;
    status: string;
    due_date: string | null;
    team_id: number;
}

interface Team {
    id: number;
    name: string;
}  

export default function Edit({ project }: PageProps) {
    const { data, setData, put } = useForm({
        team_id: project.team_id,
        name: project.name,
        description: project.description || '',
        status: project.status,
        due_date: project.due_date || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/projects/${project.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
            <Form onSubmit={handleSubmit} className="space-y-4">

                <Input
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

                <Input
                    type="date"
                    value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)}
                    className="border p-2"
                />

                <Button type="submit" className="bg-green-500 text-white px-4 py-2">
                    Update
                </Button>
                <Link href="/projects" className="ml-4 text-gray-500">Cancel</Link>
            </Form>
        </div>
    );
}
