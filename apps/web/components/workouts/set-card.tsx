'use client';

import { ChevronRight } from 'lucide-react';
import type { Exercise, Serie } from '@workspace/shared';

interface SetCardProps {
  setId: number;
  exercise: Exercise;
  series: Serie[];
  restTimeSeconds: number | null;
  onClick: () => void;
}

function formatWeightSummary(series: Serie[], type: string): string {
  const effective = series.filter((s) => s.type === 'effective' || s.type === 'failure');
  if (effective.length === 0) return '—';
  if (type === 'weight_reps' || type === 'assisted') {
    return effective
      .map((s) => `${s.weight}kg×${s.reps}`)
      .join(', ');
  }
  if (type === 'bodyweight_reps') {
    return effective.map((s) => `${s.reps} reps`).join(', ');
  }
  if (type === 'time') {
    return effective.map((s) => `${s.durationSeconds}s`).join(', ');
  }
  if (type === 'distance') {
    return effective.map((s) => `${s.meters}m`).join(', ');
  }
  return `${series.length} series`;
}

export function SetCard({ setId, exercise, series, restTimeSeconds, onClick }: SetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium">{exercise.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {series.length} series
          {series.length > 0 && (
            <> · {formatWeightSummary(series, exercise.type)}</>
          )}
        </p>
        {restTimeSeconds !== null && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            Rest: {restTimeSeconds}s
          </p>
        )}
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
    </button>
  );
}
