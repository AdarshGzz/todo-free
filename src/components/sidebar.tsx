
'use client';

import React, { useState } from 'react';
import type { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusFlowLogo } from '@/components/icons';
import { EditableText } from './editable-text';

interface SidebarProps {
  pages: Page[];
  activePageId: string | null;
  onSelectPage: (id: string) => void;
  onAddPage: () => void;
  onRenamePage: (id: string, name: string) => void;
}

export function Sidebar({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onRenamePage,
}: SidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r bg-card p-4">
      <div className="mb-8 flex items-center gap-2">
        <FocusFlowLogo className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-2xl font-bold text-foreground">
          FocusFlow
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pages
        </h2>
        {pages.map((page) => (
          <div
            key={page.id}
            className={cn(
              'group flex items-center rounded-md text-sm transition-colors',
              activePageId === page.id
                ? 'bg-secondary font-semibold'
                : 'hover:bg-secondary/80'
            )}
          >
            <button
              onClick={() => onSelectPage(page.id)}
              className="flex flex-1 items-center gap-2 p-2"
            >
              <LayoutList className="h-4 w-4" />
              <EditableText
                initialValue={page.name}
                onSave={(newName) => onRenamePage(page.id, newName)}
                className="w-full flex-1 cursor-pointer text-left"
              />
            </button>
          </div>
        ))}
      </nav>

      <div className="mt-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onAddPage}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </Button>
      </div>
    </aside>
  );
}
