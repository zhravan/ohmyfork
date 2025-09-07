import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';

type SortValue = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export function TagMultiSelect({
  options,
  value,
  onChange,
  label = 'Tags'
}: { options: string[]; value: string[]; onChange: (v: string[]) => void; label?: string }) {
  const toggle = (t: string) => {
    const next = value.includes(t) ? value.filter((x) => x !== t) : [...value, t];
    onChange(next);
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          {label}
          {value.length > 0 && (
            <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">{value.length}</span>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="rounded-md border border-border bg-background p-2 shadow-md w-56">
        <div className="max-h-56 overflow-auto pr-1">
          {options.map((t) => (
            <label key={t} className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer">
              <Checkbox.Root
                checked={value.includes(t)}
                onCheckedChange={() => toggle(t)}
                className="w-4 h-4 border border-border rounded data-[state=checked]:bg-primary data-[state=checked]:border-primary flex items-center justify-center"
              >
                <Checkbox.Indicator>
                  <Check className="w-3 h-3 text-background" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span className="truncate">{t}</span>
            </label>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

export function SortSelect({
  value,
  onChange
}: { value: SortValue; onChange: (v: SortValue) => void }) {
  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as SortValue)}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-md border border-border bg-background px-2 py-1 text-xs gap-2 min-w-[8rem]">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="rounded-md border border-border bg-background shadow-md">
        <Select.ScrollUpButton className="flex items-center justify-center py-1"><ChevronUp className="w-4 h-4" /></Select.ScrollUpButton>
        <Select.Viewport className="p-1">
          <SelectItem value="date-desc">Newest</SelectItem>
          <SelectItem value="date-asc">Oldest</SelectItem>
          <SelectItem value="title-asc">Title A–Z</SelectItem>
          <SelectItem value="title-desc">Title Z–A</SelectItem>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <Select.Item value={value} className="relative flex select-none items-center rounded px-2 py-1.5 text-xs outline-none data-[highlighted]:bg-muted data-[highlighted]:text-foreground">
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

export function PageSizeSelect({
  value,
  onChange,
  options = [5, 10, 20, 50]
}: { value: number; onChange: (v: number) => void; options?: number[] }) {
  return (
    <Select.Root value={String(value)} onValueChange={(v) => onChange(parseInt(v, 10))}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-md border border-border bg-background px-2 py-1 text-xs gap-2 min-w-[5.5rem]">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="rounded-md border border-border bg-background shadow-md">
        <Select.ScrollUpButton className="flex items-center justify-center py-1"><ChevronUp className="w-4 h-4" /></Select.ScrollUpButton>
        <Select.Viewport className="p-1">
          {options.map((n) => (
            <SelectItem key={n} value={String(n)}>{n} / page</SelectItem>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

