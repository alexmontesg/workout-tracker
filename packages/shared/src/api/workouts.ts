import { api } from './client';
import type {
  Workout,
  CreateWorkoutInput,
  UpdateWorkoutInput,
} from '../schemas/workout';

export async function listWorkouts() {
  const { data } = await api<Workout[]>('/workouts');
  return data;
}

export async function getWorkout(id: number) {
  const { data } = await api<Workout>(`/workouts/${id}`);
  return data;
}

export async function createWorkout(input: CreateWorkoutInput) {
  const { data, status } = await api<Workout>('/workouts', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return { data, status };
}

export async function updateWorkout(id: number, input: UpdateWorkoutInput) {
  const { data } = await api<Workout>(`/workouts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return data;
}

export async function finishWorkout(id: number) {
  const { data, status } = await api<Workout>(`/workouts/${id}/finish`, {
    method: 'POST',
  });
  return { data, status };
}
