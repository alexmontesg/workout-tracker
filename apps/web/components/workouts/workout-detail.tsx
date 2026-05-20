'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getWorkout, finishWorkout } from '@workspace/shared';
import type { Workout, Exercise, Serie, Set } from '@workspace/shared';
import { TopBar } from '@/components/layout/top-bar';
import { WorkoutHeader } from '@/components/workouts/workout-header';
import { SetCard } from '@/components/workouts/set-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface SetWithRelations extends Set {
  exercise: Exercise;
  series: Serie[];
}

interface WorkoutWithRelations extends Omit<Workout, 'sets'> {
  sets: SetWithRelations[];
}

interface WorkoutDetailProps {
  workout: WorkoutWithRelations;
}

export function WorkoutDetail({ workout: initial }: WorkoutDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: workout } = useQuery({
    queryKey: ['workouts', initial.id],
    queryFn: () => getWorkout(initial.id) as Promise<WorkoutWithRelations>,
    initialData: initial,
  });

  const isFinished = workout.endDate !== null;
  const sets = workout.sets ?? [];

  const finishMutation = useMutation({
    mutationFn: () => finishWorkout(workout.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push('/');
    },
  });

  return (
    <>
      <TopBar title={workout.name} showBack />
      <div className="mx-auto max-w-lg px-4 py-6">
        <WorkoutHeader
          workoutId={workout.id}
          name={workout.name}
          date={workout.date}
          endDate={workout.endDate}
        />

        {sets.length === 0 && !isFinished && (
          <p className="mb-4 text-sm text-muted-foreground">
            No exercises yet. Add your first set to start tracking.
          </p>
        )}

        {sets.length > 0 && (
          <div className="mb-6 space-y-2">
            {sets.map((set) => (
              <SetCard
                key={set.id}
                setId={set.id}
                exercise={set.exercise}
                series={set.series}
                restTimeSeconds={set.restTimeSeconds}
                onClick={() => router.push(`/workouts/${workout.id}/sets/${set.id}`)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!isFinished && (
            <>
              <Button
                onClick={() => router.push(`/workouts/${workout.id}/sets/new`)}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>

              <Button
                variant="destructive"
                className="w-full"
                disabled={finishMutation.isPending}
                onClick={() => {
                  if (window.confirm(
                    'Are you sure? This workout will be closed and cannot be edited.',
                  )) {
                    finishMutation.mutate();
                  }
                }}
              >
                {finishMutation.isPending ? 'Finishing...' : 'Finish Workout'}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
