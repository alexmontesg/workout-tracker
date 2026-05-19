'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSet, ExerciseTrackingTypeLabel } from '@workspace/shared';
import type { Exercise, Serie } from '@workspace/shared';
import { SeriesTable } from './series-table';

interface SetWithRelations {
  id: number;
  exercise: Exercise;
  timestamp: string;
  notes: string | null;
  restTimeSeconds: number | null;
  series: Serie[];
}

interface SetDetailProps {
  set: SetWithRelations;
}

export function SetDetail({ set: initialSet }: SetDetailProps) {
  const queryClient = useQueryClient();

  const { data: set } = useQuery({
    queryKey: ['sets', initialSet.id],
    queryFn: () => getSet(initialSet.id) as Promise<unknown> as Promise<SetWithRelations>,
    initialData: initialSet,
  });

  const invalidateSet = () => {
    void queryClient.invalidateQueries({ queryKey: ['sets', set.id] });
  };

  const date = new Date(set.timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{set.exercise.name}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Type: {ExerciseTrackingTypeLabel[set.exercise.type]}</span>
          <span>{formattedDate}</span>
          {set.restTimeSeconds !== null && (
            <span>Rest: {set.restTimeSeconds}s</span>
          )}
        </div>
        {set.notes !== null && (
          <p className="mt-2 text-sm text-muted-foreground">{set.notes}</p>
        )}
      </div>

      <SeriesTable
        setId={set.id}
        exerciseType={set.exercise.type}
        initialSeries={set.series}
        onSeriesChange={invalidateSet}
      />
    </div>
  );
}
