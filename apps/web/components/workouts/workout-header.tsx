'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateWorkout } from '@workspace/shared';
import { Pencil } from 'lucide-react';

interface WorkoutHeaderProps {
  workoutId: number;
  name: string;
  date: string;
  endDate: string | null;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function WorkoutHeader({ workoutId, name, date, endDate }: WorkoutHeaderProps) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  const mutation = useMutation({
    mutationFn: (newName: string) => updateWorkout(workoutId, { name: newName }),
  });

  const isFinished = endDate !== null;

  const handleSave = () => {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== name) {
      mutation.mutate(trimmed);
    }
    setEditing(false);
  };

  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
      {isFinished ? (
        <div>
          <h1 className="mt-1 text-xl font-bold">{name}</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Completed at {formatTime(endDate)}
          </p>
        </div>
      ) : (
        <div className="mt-1 flex items-center gap-2">
          {editing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') {
                  setEditName(name);
                  setEditing(false);
                }
              }}
              className="min-w-0 flex-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-lg font-bold outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              autoFocus
            />
          ) : (
            <>
              <h1 className="text-xl font-bold">{name}</h1>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
