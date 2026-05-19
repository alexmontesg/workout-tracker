import { api } from '@workspace/shared';
import type { Exercise } from '@workspace/shared';
import type { Serie } from '@workspace/shared';
import { SetDetail } from '@/components/sets/set-detail';

export const dynamic = 'force-dynamic';

interface SetWithRelations {
  id: number;
  exercise: Exercise;
  timestamp: string;
  notes: string | null;
  restTimeSeconds: number | null;
  series: Serie[];
}

interface SetsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SetDetailPage({ params }: SetsPageProps) {
  const { id } = await params;
  const { data: set } = await api<SetWithRelations>(`/sets/${id}`);

  return (
    <div className="container mx-auto py-8">
      <SetDetail set={set} />
    </div>
  );
}
