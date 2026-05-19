import { api } from '@workspace/shared';
import type { Exercise } from '@workspace/shared';
import { ExercisesTable } from '@/components/exercises/exercises-table';

export const dynamic = 'force-dynamic';

export default async function ExercisesPage() {
  const { data: initialExercises } = await api<Exercise[]>('/exercises');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Exercises</h1>
      <ExercisesTable initialExercises={initialExercises} />
    </div>
  );
}
