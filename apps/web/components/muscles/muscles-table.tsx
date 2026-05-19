'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { listMuscles } from '@workspace/shared';
import type { Muscle } from '@workspace/shared';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CreateMuscleDialog } from './create-muscle-dialog';
import { EditMuscleDialog } from './edit-muscle-dialog';
import { DeleteMuscleDialog } from './delete-muscle-dialog';

interface MusclesTableProps {
  initialMuscles: Muscle[];
}

export function MusclesTable({ initialMuscles }: MusclesTableProps) {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingMuscle, setEditingMuscle] = useState<Muscle | null>(null);
  const [deletingMuscle, setDeletingMuscle] = useState<Muscle | null>(null);

  const { data: muscles } = useQuery({
    queryKey: ['muscles'],
    queryFn: listMuscles,
    initialData: initialMuscles,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreateOpen(true)}>Create Muscle</Button>
      </div>

      {muscles.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No muscles found. Create one to get started.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {muscles.map((muscle) => (
              <TableRow key={muscle.id}>
                <TableCell>{muscle.id}</TableCell>
                <TableCell>{muscle.name}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingMuscle(muscle)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeletingMuscle(muscle)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CreateMuscleDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={() => {
          void queryClient.invalidateQueries({ queryKey: ['muscles'] });
        }}
      />

      {editingMuscle && (
        <EditMuscleDialog
          muscle={editingMuscle}
          open={!!editingMuscle}
          onOpenChange={(open) => {
            if (!open) setEditingMuscle(null);
          }}
          onSuccess={() => {
            void queryClient.invalidateQueries({ queryKey: ['muscles'] });
          }}
        />
      )}

      {deletingMuscle && (
        <DeleteMuscleDialog
          muscle={deletingMuscle}
          open={!!deletingMuscle}
          onOpenChange={(open) => {
            if (!open) setDeletingMuscle(null);
          }}
          onSuccess={() => {
            void queryClient.invalidateQueries({ queryKey: ['muscles'] });
          }}
        />
      )}
    </div>
  );
}
