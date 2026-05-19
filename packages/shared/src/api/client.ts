export type ApiResponse<T> = { data: T; status: number };

const BASE_URL = process.env.NESTJS_API_URL ?? 'http://localhost:3001';

export async function api<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const data = (await res.json()) as T;
  return { data, status: res.status };
}
