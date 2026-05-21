'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { listSeries } from '@workspace/shared';
import type { Serie } from '@workspace/shared';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SerieRow } from './serie-row';

type ExerciseTrackingType = 'time' | 'weight_reps' | 'bodyweight_reps' | 'distance' | 'assisted';

interface Column {
  id: string;
  label: string;
}

const TRACKING_TYPE_COLUMNS: Record<ExerciseTrackingType, Column[]> = {
  time: [
    { id: 'type', label: 'Type' },
    { id: 'durationSeconds', label: 'Duration (s)' },
  ],
  weight_reps: [
    { id: 'type', label: 'Type' },
    { id: 'weight', label: 'Weight' },
    { id: 'reps', label: 'Reps' },
  ],
  bodyweight_reps: [
    { id: 'type', label: 'Type' },
    { id: 'reps', label: 'Reps' },
  ],
  distance: [
    { id: 'type', label: 'Type' },
    { id: 'meters', label: 'Meters' },
  ],
  assisted: [
    { id: 'type', label: 'Type' },
    { id: 'weight', label: 'Weight' },
    { id: 'reps', label: 'Reps' },
  ],
};

interface SeriesTableProps {
  setId: number;
  exerciseType: ExerciseTrackingType;
  initialSeries: Serie[];
  onSeriesChange: () => void;
  readOnly?: boolean;
}

export function SeriesTable({
  setId,
  exerciseType,
  initialSeries,
  onSeriesChange,
  readOnly = false,
}: SeriesTableProps) {
  const queryClient = useQueryClient();
  const [newRowKey, setNewRowKey] = useState(0);

  const { data: series } = useQuery({
    queryKey: ['series', setId],
    queryFn: () => listSeries(setId),
    initialData: initialSeries,
  });

  const columns = TRACKING_TYPE_COLUMNS[exerciseType] ?? TRACKING_TYPE_COLUMNS.weight_reps;
  const hasActions = !readOnly;

  const handleSave = () => {
    void queryClient.invalidateQueries({ queryKey: ['series', setId] });
    onSeriesChange();
    setNewRowKey((k) => k + 1);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Series</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            {columns.map((col) => (
              <TableHead key={col.id}>{col.label}</TableHead>
            ))}
            {hasActions && <TableHead className="w-24">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {series.map((serie, index) => (
            <SerieRow
              key={serie.id}
              setId={setId}
              serie={serie}
              index={index + 1}
              columns={columns}
              exerciseType={exerciseType}
              isNew={false}
              onSave={handleSave}
              readOnly={readOnly}
            />
          ))}
          {!readOnly && (
            <SerieRow
              key={`new-${newRowKey}`}
              setId={setId}
              serie={null}
              index={series.length + 1}
              columns={columns}
              exerciseType={exerciseType}
              isNew={true}
              onSave={handleSave}
              readOnly={readOnly}
            />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
