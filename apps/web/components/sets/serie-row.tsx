'use client';

import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { toast } from 'sonner';
import type { Serie, CreateSerieInput } from '@workspace/shared';

import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SerieTypeBadge } from './serie-type-badge';

type ExerciseTrackingType = 'time' | 'weight_reps' | 'bodyweight_reps' | 'distance' | 'assisted';

interface Column {
  id: string;
  label: string;
}

const SERIE_TYPE_ITEMS = [
  { value: 'warmup', label: 'Warmup' },
  { value: 'effective', label: 'Effective' },
  { value: 'failure', label: 'Failure' },
  { value: 'drop', label: 'Drop' },
];

function getRequiredFields(type: ExerciseTrackingType): string[] {
  switch (type) {
    case 'time': return ['type', 'durationSeconds'];
    case 'weight_reps': return ['type', 'weight', 'reps'];
    case 'bodyweight_reps': return ['type', 'reps'];
    case 'distance': return ['type', 'meters'];
    case 'assisted': return ['type', 'weight', 'reps'];
  }
}

function isComplete(values: Record<string, string>, exerciseType: ExerciseTrackingType): boolean {
  const required = getRequiredFields(exerciseType);
  return required.every((field) => {
    const val = values[field];
    return val !== undefined && val !== '';
  });
}

function getDefaultValues(type: string): Record<string, string> {
  return { type };
}

interface SerieRowProps {
  setId: number;
  serie: Serie | null;
  index: number;
  columns: Column[];
  exerciseType: ExerciseTrackingType;
  isNew: boolean;
  onSave: () => void;
}

export function SerieRow({
  setId,
  serie,
  index,
  columns,
  exerciseType,
  isNew,
  onSave,
}: SerieRowProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [values, setValues] = useState<Record<string, string>>(
    () => getDefaultValues(isNew ? 'effective' : (serie?.type ?? 'effective')),
  );
  const [isSaving, setIsSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valuesRef = useRef(values);
  const isSavingRef = useRef(false);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const rowId = useId();

  valuesRef.current = values;
  isSavingRef.current = isSaving;

  const clearDebounce = useCallback(() => {
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, []);

  const doSave = useCallback(async (data: Record<string, string>) => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);

    try {
      const payload: CreateSerieInput = { type: data.type as CreateSerieInput['type'] };
      if (data.weight !== undefined && data.weight !== '') payload.weight = Number(data.weight);
      if (data.reps !== undefined && data.reps !== '') payload.reps = Number(data.reps);
      if (data.durationSeconds !== undefined && data.durationSeconds !== '') payload.durationSeconds = Number(data.durationSeconds);
      if (data.meters !== undefined && data.meters !== '') payload.meters = Number(data.meters);

      let res: Response;
      if (isNew) {
        res = await fetch(`/api/sets/${setId}/series`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/sets/${setId}/series/${serie!.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ message: 'Failed to save' }));
        throw new Error(errBody.message ?? 'Failed to save');
      }

      if (isNew) {
        setValues(getDefaultValues('effective'));
        onSave();
      } else {
        setIsEditing(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
      if (!isNew) {
        setValues(getDefaultValues(serie!.type));
        setIsEditing(false);
      }
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, [setId, serie, isNew, onSave]);

  const triggerSave = useCallback(() => {
    const current = valuesRef.current;
    if (isComplete(current, exerciseType)) {
      clearDebounce();
      void doSave(current);
      return true;
    }
    return false;
  }, [exerciseType, clearDebounce, doSave]);

  const handleFieldChange = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleFieldBlur = useCallback(() => {
    triggerSave();
  }, [triggerSave]);

  const handleRowBlur = useCallback((e: React.FocusEvent) => {
    if (isNew || !isEditing || isSavingRef.current) return;
    const relatedTarget = e.relatedTarget as Node | null;
    if (relatedTarget && rowRef.current?.contains(relatedTarget)) return;
    if (!isComplete(valuesRef.current, exerciseType)) {
      setValues(getDefaultValues(serie!.type));
      setIsEditing(false);
    }
  }, [isNew, isEditing, exerciseType, serie]);

  useEffect(() => {
    if (isComplete(valuesRef.current, exerciseType)) {
      clearDebounce();
      debounceRef.current = setTimeout(() => {
        triggerSave();
      }, 3000);
    }
    return clearDebounce;
  }, [values, exerciseType, clearDebounce, triggerSave]);

  useEffect(() => {
    return clearDebounce;
  }, [clearDebounce]);

  const handleEdit = () => {
    setValues(getDefaultValues(serie!.type));
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this serie?')) return;
    try {
      const res = await fetch(`/api/sets/${setId}/series/${serie!.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      onSave();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const showEditing = isEditing || isNew;

  const renderField = (colId: string) => {
    if (colId === 'type') {
      if (!showEditing) {
        return <SerieTypeBadge type={serie!.type} />;
      }
      return (
        <Select
          value={values.type ?? 'effective'}
          onValueChange={(val) => handleFieldChange('type', val)}
          items={SERIE_TYPE_ITEMS}
        />
      );
    }

    if (showEditing) {
      const numValue = values[colId] ?? '';
      return (
        <Input
          type="number"
          value={numValue}
          onChange={(e) => handleFieldChange(colId, e.target.value)}
          onBlur={handleFieldBlur}
          className="h-7 w-20"
        />
      );
    }

    const displayValue = serie ? serie[colId as keyof Serie] : null;
    return <span>{displayValue !== null ? String(displayValue) : '-'}</span>;
  };

  return (
    <TableRow ref={rowRef} onBlur={handleRowBlur}>
      <TableCell className="text-muted-foreground text-xs">{index}</TableCell>
      {columns.map((col) => (
        <TableCell key={col.id}>{renderField(col.id)}</TableCell>
      ))}
      <TableCell>
        {isSaving ? (
          <span className="text-xs text-muted-foreground">saving...</span>
        ) : showEditing && !isNew ? null : !isNew ? (
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              ×
            </Button>
          </div>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
