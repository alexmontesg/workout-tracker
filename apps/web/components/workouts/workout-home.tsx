'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { listWorkouts, createWorkout, getWorkout } from '@workspace/shared';
import { Button } from '@/components/ui/button';

export function WorkoutHome() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: workouts = [] } = useQuery({
    queryKey: ['workouts'],
    queryFn: listWorkouts,
  });

  const finishedWorkouts = workouts.filter((w) => w.endDate !== null).reverse();

  const mutation = useMutation({
    mutationFn: () => createWorkout({ date: new Date().toISOString() }),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push(`/workouts/${result.data.id}`);
    },
  });

  return (
    <div className="mx-auto max-w-lg px-4 pt-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Workout Tracker</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your workouts, one rep at a time
        </p>
      </div>

      <Button
        size="lg"
        className="w-full py-6 text-lg"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? 'Starting...' : 'Start Workout'}
      </Button>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Recent Workouts</h2>
        {finishedWorkouts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No workouts yet. Start your first one!
          </p>
        ) : (
          <ul className="space-y-2">
            {finishedWorkouts.map((workout) => {
              const date = new Date(workout.date);
              const formatted = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              const setCount = workout.sets?.length ?? 0;
              return (
                <li key={workout.id}>
                  <button
                    type="button"
                    onClick={() => router.push(`/workouts/${workout.id}`)}
                    className="flex w-full items-center rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-accent"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{workout.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatted} · {setCount} {setCount === 1 ? 'set' : 'sets'}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
