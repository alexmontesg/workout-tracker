import { NextRequest, NextResponse } from 'next/server';
import { api } from '@workspace/shared';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { data, status } = await api(`/exercises/${id}`);
  return NextResponse.json(data, { status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as Record<string, unknown>;
  const { data, status } = await api(`/exercises/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return NextResponse.json(data, { status });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { data, status } = await api(`/exercises/${id}`, {
    method: 'DELETE',
  });
  return NextResponse.json(data ?? null, { status });
}
