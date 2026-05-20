import { api } from '@workspace/shared';
import type { Workout, Exercise, Serie, Set } from '@workspace/shared';
import { WorkoutDetail } from '@/components/workouts/workout-detail';

export const dynamic = 'force-dynamic';

interface SetWithRelations extends Set {
  exercise: Exercise;
  series: Serie[];
}

interface WorkoutWithRelations extends Omit<Workout, 'sets'> {
  sets: SetWithRelations[];
}

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const { data: workout } = await api<WorkoutWithRelations>(`/workouts/${id}`);

  return <WorkoutDetail workout={workout} />;
}
