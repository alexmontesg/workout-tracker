'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  backHref?: string;
}

export function TopBar({ title, showBack = false }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex h-12 max-w-lg items-center gap-2 px-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="-ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="truncate text-base font-semibold">{title}</h1>
      </div>
    </header>
  );
}
