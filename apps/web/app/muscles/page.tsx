import { api } from '@workspace/shared';
import type { Muscle } from '@workspace/shared';
import { MusclesTable } from '@/components/muscles/muscles-table';

export const dynamic = 'force-dynamic';

export default async function MusclesPage() {
  const { data: initialMuscles } = await api<Muscle[]>('/muscles');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Muscles</h1>
      <MusclesTable initialMuscles={initialMuscles} />
    </div>
  );
}
