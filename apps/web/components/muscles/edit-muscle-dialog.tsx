'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateMuscleSchema } from '@workspace/shared';
import type { Muscle, UpdateMuscleInput } from '@workspace/shared';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';

interface EditMuscleDialogProps {
  muscle: Muscle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditMuscleDialog({
  muscle,
  open,
  onOpenChange,
  onSuccess,
}: EditMuscleDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateMuscleInput>({
    resolver: zodResolver(UpdateMuscleSchema),
  });

  useEffect(() => {
    if (open) {
      reset({ name: muscle.name });
    }
  }, [open, muscle, reset]);

  const mutation = useMutation({
    mutationFn: async (data: UpdateMuscleInput) => {
      const res = await fetch(`/api/muscles/${muscle.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update muscle');
      return res.json() as Promise<{ id: string; name: string }>;
    },
    onSuccess: () => {
      toast.success('Muscle updated');
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
          <DialogTitle>Edit Muscle</DialogTitle>
          <DialogDescription>
            Update the name of this muscle group.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit((data) => mutation.mutate(data))(e);
          }}
        >
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input {...register('name')} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
