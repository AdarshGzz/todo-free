
import { cn } from '@/lib/utils';
import React from 'react';

interface AppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppHeader({ children, className }: AppHeaderProps) {
  return (
    <header className={cn("flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6", className)}>
      {children}
    </header>
  );
}
