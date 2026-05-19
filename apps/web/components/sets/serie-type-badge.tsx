'use client';

import { Badge } from '@/components/ui/badge';

const typeColors: Record<string, string> = {
  warmup: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200',
  effective: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200',
  failure: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200',
  drop: 'bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-200',
};

const typeLabels: Record<string, string> = {
  warmup: 'Warmup',
  effective: 'Effective',
  failure: 'Failure',
  drop: 'Drop',
};

interface SerieTypeBadgeProps {
  type: string;
}

export function SerieTypeBadge({ type }: SerieTypeBadgeProps) {
  return (
    <Badge className={typeColors[type] ?? ''} variant="outline">
      {typeLabels[type] ?? type}
    </Badge>
  );
}
