'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateExerciseSchema, ExerciseTrackingTypeLabel } from '@workspace/shared';
import type { CreateExerciseInput, Muscle } from '@workspace/shared';

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

interface CreateExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  muscles: Muscle[];
}

export function CreateExerciseDialog({
  open,
  onOpenChange,
  onSuccess,
  muscles,
}: CreateExerciseDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateExerciseInput>({
    resolver: zodResolver(CreateExerciseSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateExerciseInput) => {
      const res = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create exercise');
      return res.json() as Promise<{ id: number; name: string }>;
    },
    onSuccess: () => {
      toast.success('Exercise created');
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
          <DialogTitle>Create Exercise</DialogTitle>
          <DialogDescription>
            Add a new exercise to the system.
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
                <Input {...register('name')} placeholder="e.g. Bench Press" />
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
