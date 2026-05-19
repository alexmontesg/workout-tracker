'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CreateSetSchema, listExercises } from '@workspace/shared';
import type { CreateSetInput } from '@workspace/shared';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';

function formatDatetimeLocal(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function CreateSetForm() {
  const router = useRouter();

  const { data: exercises = [] } = useQuery({
    queryKey: ['exercises'],
    queryFn: listExercises,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateSetInput>({
    resolver: zodResolver(CreateSetSchema),
    defaultValues: {
      timestamp: formatDatetimeLocal(new Date()),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateSetInput) => {
      const res = await fetch('/api/sets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create set');
      return res.json() as Promise<{ id: number }>;
    },
    onSuccess: (set) => {
      toast.success('Set created');
      router.push(`/sets/${set.id}`);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit((data) => mutation.mutate(data))(e);
      }}
      className="flex flex-col gap-6"
    >
      <Field>
        <FieldLabel>Exercise</FieldLabel>
        <FieldContent>
          <Controller
            name="exerciseId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(val) => field.onChange(Number(val))}
                placeholder="Select exercise"
                items={exercises.map((ex) => ({
                  value: ex.id.toString(),
                  label: ex.name,
                }))}
              />
            )}
          />
          {errors.exerciseId && (
            <FieldError>{errors.exerciseId.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Timestamp</FieldLabel>
        <FieldContent>
          <Input
            type="datetime-local"
            {...register('timestamp')}
          />
          {errors.timestamp && (
            <FieldError>{errors.timestamp.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Rest Time (seconds)</FieldLabel>
        <FieldContent>
          <Input
            type="number"
            placeholder="e.g. 90"
            {...register('restTimeSeconds', { valueAsNumber: true })}
          />
          {errors.restTimeSeconds && (
            <FieldError>{errors.restTimeSeconds.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Notes</FieldLabel>
        <FieldContent>
          <textarea
            className="h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            placeholder="Optional notes..."
            {...register('notes')}
          />
          {errors.notes && (
            <FieldError>{errors.notes.message}</FieldError>
          )}
        </FieldContent>
      </Field>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Set'}
        </Button>
      </div>
    </form>
  );
}
