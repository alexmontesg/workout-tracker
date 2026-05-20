import { NextRequest, NextResponse } from 'next/server';
import { api } from '@workspace/shared';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: workoutId } = await params;
  const body = (await request.json()) as Record<string, unknown>;
  const { data, status } = await api(`/workouts/${workoutId}/sets`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return NextResponse.json(data, { status: status === 200 ? 201 : status });
}
