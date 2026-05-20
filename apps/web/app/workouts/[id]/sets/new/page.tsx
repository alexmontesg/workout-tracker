import { CreateSetForm } from '@/components/sets/create-set-form';

export const dynamic = 'force-dynamic';

interface NewSetPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewSetPage({ params }: NewSetPageProps) {
  const { id } = await params;
  const workoutId = Number(id);

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <h1 className="mb-6 text-xl font-bold">Add Exercise</h1>
      <CreateSetForm workoutId={workoutId} />
    </div>
  );
}
