'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateMuscleSchema } from '@workspace/shared';
import type { CreateMuscleInput } from '@workspace/shared';

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

interface CreateMuscleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateMuscleDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateMuscleDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMuscleInput>({
    resolver: zodResolver(CreateMuscleSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateMuscleInput) => {
      const res = await fetch('/api/muscles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create muscle');
      return res.json() as Promise<{ id: string; name: string }>;
    },
    onSuccess: () => {
      toast.success('Muscle created');
      reset();
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
          <DialogTitle>Create Muscle</DialogTitle>
          <DialogDescription>
            Add a new muscle group to the system.
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
              <Input {...register('name')} placeholder="e.g. Chest" />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
