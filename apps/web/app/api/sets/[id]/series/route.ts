import { NextRequest, NextResponse } from 'next/server';
import { api } from '@workspace/shared';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { data, status } = await api(`/sets/${id}/series`);
  return NextResponse.json(data, { status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as Record<string, unknown>;
  const { data, status } = await api(`/sets/${id}/series`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return NextResponse.json(data, { status: status === 200 ? 201 : status });
}
