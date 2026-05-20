import { NextRequest, NextResponse } from 'next/server';
import { api } from '@workspace/shared';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { data, status } = await api(`/workouts/${id}/finish`, {
    method: 'POST',
  });
  return NextResponse.json(data, { status: status === 200 ? 201 : status });
}
