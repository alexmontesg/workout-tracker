import { api } from './client';
import type {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
} from '../schemas/exercise';

export async function listExercises() {
  const { data } = await api<Exercise[]>('/exercises');
  return data;
}

export async function getExercise(id: number) {
  const { data } = await api<Exercise>(`/exercises/${id}`);
  return data;
}

export async function createExercise(input: CreateExerciseInput) {
  const { data, status } = await api<Exercise>('/exercises', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return { data, status };
}

export async function updateExercise(id: number, input: UpdateExerciseInput) {
  const { data } = await api<Exercise>(`/exercises/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return data;
}

export async function deleteExercise(id: number) {
  const { status } = await api(`/exercises/${id}`, { method: 'DELETE' });
  return status;
}
