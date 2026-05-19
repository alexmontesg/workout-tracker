import { NextRequest, NextResponse } from 'next/server';
import { api } from '@workspace/shared';

export async function GET() {
  const { data, status } = await api('/sets');
  return NextResponse.json(data, { status });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, unknown>;
  const { data, status } = await api('/sets', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return NextResponse.json(data, { status: status === 200 ? 201 : status });
}
