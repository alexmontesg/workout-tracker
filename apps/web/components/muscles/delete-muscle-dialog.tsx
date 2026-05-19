'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Muscle } from '@workspace/shared';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteMuscleDialogProps {
  muscle: Muscle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeleteMuscleDialog({
  muscle,
  open,
  onOpenChange,
  onSuccess,
}: DeleteMuscleDialogProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/muscles/${muscle.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        throw new Error(body.message ?? 'Failed to delete muscle');
      }
    },
    onSuccess: () => {
      toast.success('Muscle deleted');
      onOpenChange(false);
      onSuccess();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Muscle</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{muscle.name}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
