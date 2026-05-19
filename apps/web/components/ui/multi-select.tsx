'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MultiSelectOption {
  id: number;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: number[];
  onChange: (ids: number[]) => void;
  placeholder?: string;
  className?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Search...',
  className,
}: MultiSelectProps) {
  const selectedOptions = options.filter((o) => selected.includes(o.id));
  const availableOptions = options.filter((o) => !selected.includes(o.id));

  return (
    <ComboboxPrimitive.Root
      multiple
      value={selectedOptions}
      onValueChange={(values) => {
        const ids = (values as MultiSelectOption[]).map((v) => v.id);
        onChange(ids);
      }}
    >
      <div
        data-slot="multi-select"
        className={cn(
          'flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
          className,
        )}
      >
        <ComboboxPrimitive.Chips data-slot="multi-select-chips" className="flex flex-wrap items-center gap-1">
          {selectedOptions.map((option) => (
            <ComboboxPrimitive.Chip key={option.id} value={option}>
              <Badge variant="secondary" className="gap-1 pr-1">
                {option.label}
                <ComboboxPrimitive.ChipRemove className="flex size-3.5 cursor-pointer items-center justify-center rounded-full hover:bg-muted-foreground/20">
                  <XIcon className="size-2.5" />
                </ComboboxPrimitive.ChipRemove>
              </Badge>
            </ComboboxPrimitive.Chip>
          ))}
        </ComboboxPrimitive.Chips>
        <ComboboxPrimitive.Input
          data-slot="multi-select-input"
          placeholder={selectedOptions.length === 0 ? placeholder : undefined}
          className="min-w-[60px] flex-1 border-none bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground"
        />
        <ComboboxPrimitive.Status />
      </div>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          className="z-50 outline-none"
          sideOffset={4}
        >
          <ComboboxPrimitive.Popup className="min-w-[var(--anchor-width)] rounded-xl border border-border bg-popover p-1 text-sm text-popover-foreground shadow-lg duration-100 entry:animate-in entry:fade-in entry:zoom-in-95 exit:animate-out exit:fade-out exit:zoom-out-95">
            <ComboboxPrimitive.List>
              {availableOptions.length === 0 ? (
                <ComboboxPrimitive.Empty className="px-2 py-6 text-center text-muted-foreground">
                  No muscles found
                </ComboboxPrimitive.Empty>
              ) : (
                availableOptions.map((option) => (
                  <ComboboxPrimitive.Item
                    key={option.id}
                    value={option}
                    className="relative flex cursor-default items-center rounded-lg px-2 py-1.5 text-sm outline-none select-none data-highlighted:bg-muted"
                  >
                    {option.label}
                  </ComboboxPrimitive.Item>
                ))
              )}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}

export { MultiSelect };
export type { MultiSelectOption, MultiSelectProps };
