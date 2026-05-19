'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  placeholder?: string;
  items: SelectItem[];
  className?: string;
}

function Select({
  value,
  onValueChange,
  placeholder,
  items,
  className,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          'flex h-8 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive data-placeholder:text-muted-foreground',
          className,
        )}
      >
        <SelectPrimitive.Value data-slot="select-value" placeholder={placeholder} />
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Backdrop className="fixed inset-0 z-50" />
        <SelectPrimitive.Positioner
          className="z-50 outline-none"
          sideOffset={4}
        >
          <SelectPrimitive.Popup className="min-w-[var(--anchor-width)] rounded-xl border border-border bg-popover p-1 text-sm text-popover-foreground shadow-lg duration-100 entry:animate-in entry:fade-in entry:zoom-in-95 exit:animate-out exit:fade-out exit:zoom-out-95">
            <SelectPrimitive.List>
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none select-none data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50"
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-1.5 flex size-3.5 items-center justify-center">
                    <CheckIcon className="size-3.5" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText className="ml-5">
                    {item.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
