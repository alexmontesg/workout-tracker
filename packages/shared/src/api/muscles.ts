import { api } from './client';
import type {
  Muscle,
  CreateMuscleInput,
  UpdateMuscleInput,
} from '../schemas/muscle';

export async function listMuscles() {
  const { data } = await api<Muscle[]>('/muscles');
  return data;
}

export async function getMuscle(id: number) {
  const { data } = await api<Muscle>(`/muscles/${id}`);
  return data;
}

export async function createMuscle(input: CreateMuscleInput) {
  const { data, status } = await api<Muscle>('/muscles', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return { data, status };
}

export async function updateMuscle(id: number, input: UpdateMuscleInput) {
  const { data } = await api<Muscle>(`/muscles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return data;
}

export async function deleteMuscle(id: number) {
  const { status } = await api(`/muscles/${id}`, { method: 'DELETE' });
  return status;
}
