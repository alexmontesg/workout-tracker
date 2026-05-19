import { api } from './client';
import type {
  Serie,
  CreateSerieInput,
  UpdateSerieInput,
} from '../schemas/serie';

export async function listSeries(setId: number) {
  const { data } = await api<Serie[]>(`/sets/${setId}/series`);
  return data;
}

export async function createSerie(setId: number, input: CreateSerieInput) {
  const { data, status } = await api<Serie>(`/sets/${setId}/series`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return { data, status };
}

export async function updateSerie(
  setId: number,
  id: number,
  input: UpdateSerieInput,
) {
  const { data } = await api<Serie>(`/sets/${setId}/series/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
  return data;
}

export async function deleteSerie(setId: number, id: number) {
  const { status } = await api(`/sets/${setId}/series/${id}`, {
    method: 'DELETE',
  });
  return status;
}
