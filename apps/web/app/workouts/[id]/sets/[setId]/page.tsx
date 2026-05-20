import { api } from '@workspace/shared';
import type { Exercise } from '@workspace/shared';
import type { Serie } from '@workspace/shared';
import { TopBar } from '@/components/layout/top-bar';
import { SetDetail } from '@/components/sets/set-detail';

export const dynamic = 'force-dynamic';

interface SetWithRelations {
  id: number;
  exercise: Exercise;
  timestamp: string;
  notes: string | null;
  restTimeSeconds: number | null;
  series: Serie[];
}

interface SetDetailPageProps {
  params: Promise<{ id: string; setId: string }>;
}

export default async function WorkoutSetDetailPage({ params }: SetDetailPageProps) {
  const { id: workoutId, setId } = await params;
  const { data: set } = await api<SetWithRelations>(`/workouts/${workoutId}/sets/${setId}`);

  return (
    <>
      <TopBar title={set.exercise.name} showBack />
      <div className="mx-auto max-w-lg px-4 py-6">
        <SetDetail set={set} />
      </div>
    </>
  );
}
