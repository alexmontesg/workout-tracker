'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateExerciseSchema, ExerciseTrackingTypeLabel } from '@workspace/shared';
import type { Exercise, UpdateExerciseInput, Muscle } from '@workspace/shared';

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
import { Select } from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';

interface EditExerciseDialogProps {
  exercise: Exercise;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  muscles: Muscle[];
}

export function EditExerciseDialog({
  exercise,
  open,
  onOpenChange,
  onSuccess,
  muscles,
}: EditExerciseDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UpdateExerciseInput>({
    resolver: zodResolver(UpdateExerciseSchema),
  });

  useEffect(() => {
    if (open) {
      reset({
        name: exercise.name,
        type: exercise.type,
        muscleIds: exercise.muscles.map((m) => m.id),
      });
    }
  }, [open, exercise, reset]);

  const mutation = useMutation({
    mutationFn: async (data: UpdateExerciseInput) => {
      const res = await fetch(`/api/exercises/${exercise.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update exercise');
      return res.json() as Promise<{ id: number; name: string }>;
    },
    onSuccess: () => {
      toast.success('Exercise updated');
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
          <DialogTitle>Edit Exercise</DialogTitle>
          <DialogDescription>
            Update the details of this exercise.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit((data) => mutation.mutate(data))(e);
          }}
        >
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <Input {...register('name')} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Type</FieldLabel>
              <FieldContent>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select type"
                      items={[
                        { value: 'time', label: ExerciseTrackingTypeLabel.time },
                        { value: 'weight_reps', label: ExerciseTrackingTypeLabel.weight_reps },
                        { value: 'bodyweight_reps', label: ExerciseTrackingTypeLabel.bodyweight_reps },
                        { value: 'distance', label: ExerciseTrackingTypeLabel.distance },
                        { value: 'assisted', label: ExerciseTrackingTypeLabel.assisted },
                      ]}
                    />
                  )}
                />
                {errors.type && <FieldError>{errors.type.message}</FieldError>}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Muscles</FieldLabel>
              <FieldContent>
                <Controller
                  name="muscleIds"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={muscles.map((m) => ({ id: m.id, label: m.name }))}
                      selected={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Search muscles..."
                    />
                  )}
                />
                {errors.muscleIds && (
                  <FieldError>{errors.muscleIds.message}</FieldError>
                )}
              </FieldContent>
            </Field>
          </div>

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
