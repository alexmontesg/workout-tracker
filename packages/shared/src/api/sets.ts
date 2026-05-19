import { api } from './client';
import type {
  Set,
  CreateSetInput,
  UpdateSetInput,
} from '../schemas/set';

export async function listSets() {
  const { data } = await api<Set[]>('/sets');
  return data;
}

export async function getSet(id: number) {
  const { data } = await api<Set>(`/sets/${id}`);
  return data;
}

export async function createSet(input: CreateSetInput) {
  const { data, status } = await api<Set>('/sets', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return { data, status };
}

export async function updateSet(id: number, input: UpdateSetInput) {
  const { data } = await api<Set>(`/sets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return data;
}

export async function deleteSet(id: number) {
  const { status } = await api(`/sets/${id}`, { method: 'DELETE' });
  return status;
}
