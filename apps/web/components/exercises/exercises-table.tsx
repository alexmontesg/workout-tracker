'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { listExercises, listMuscles, ExerciseTrackingTypeLabel } from '@workspace/shared';
import type { Exercise, Muscle } from '@workspace/shared';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateExerciseDialog } from './create-exercise-dialog';
import { EditExerciseDialog } from './edit-exercise-dialog';
import { DeleteExerciseDialog } from './delete-exercise-dialog';

interface ExercisesTableProps {
  initialExercises: Exercise[];
}

export function ExercisesTable({ initialExercises }: ExercisesTableProps) {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(null);

  const { data: exercises } = useQuery({
    queryKey: ['exercises'],
    queryFn: listExercises,
    initialData: initialExercises,
  });

  const { data: muscles = [] } = useQuery({
    queryKey: ['muscles'],
    queryFn: listMuscles,
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ['exercises'] });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreateOpen(true)}>Create Exercise</Button>
      </div>

      {exercises.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No exercises found. Create one to get started.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-36">Type</TableHead>
              <TableHead>Muscles</TableHead>
              <TableHead className="w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.map((exercise) => {
              const musclesToShow = exercise.muscles.slice(0, 2);
              const remainingCount = exercise.muscles.length - 2;

              return (
                <TableRow key={exercise.id}>
                  <TableCell>{exercise.id}</TableCell>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>
                    {ExerciseTrackingTypeLabel[exercise.type]}
                  </TableCell>
                  <TableCell className="space-x-1">
                    {musclesToShow.map((m) => (
                      <Badge key={m.id} variant="secondary">
                        {m.name}
                      </Badge>
                    ))}
                    {remainingCount > 0 && (
                      <Badge variant="outline">+{remainingCount} more</Badge>
                    )}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingExercise(exercise)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeletingExercise(exercise)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <CreateExerciseDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={invalidate}
        muscles={muscles}
      />

      {editingExercise && (
        <EditExerciseDialog
          exercise={editingExercise}
          open={!!editingExercise}
          onOpenChange={(open) => {
            if (!open) setEditingExercise(null);
          }}
          onSuccess={invalidate}
          muscles={muscles}
        />
      )}

      {deletingExercise && (
        <DeleteExerciseDialog
          exercise={deletingExercise}
          open={!!deletingExercise}
          onOpenChange={(open) => {
            if (!open) setDeletingExercise(null);
          }}
          onSuccess={invalidate}
        />
      )}
    </div>
  );
}
