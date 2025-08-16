'use client';

import React, { useState } from 'react';
import type { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusFlowLogo } from '@/components/icons';

interface SidebarProps {
  pages: Page[];
  activePageId: string | null;
  onSelectPage: (id: string) => void;
  onAddPage: (name: string) => void;
}

export function Sidebar({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
}: SidebarProps) {
  const [newPageName, setNewPageName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddPage = () => {
    if (newPageName.trim()) {
      onAddPage(newPageName.trim());
      setNewPageName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPage();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewPageName('');
    }
  };

  return (
    <aside className="flex w-64 flex-col border-r bg-card p-4">
      <div className="mb-8 flex items-center gap-2">
        <FocusFlowLogo className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-2xl font-bold text-foreground">
          FocusFlow
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pages
        </h2>
        {pages.map((page) => (
          <Button
            key={page.id}
            variant={activePageId === page.id ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start',
              activePageId === page.id && 'font-bold'
            )}
            onClick={() => onSelectPage(page.id)}
          >
            <LayoutList className="mr-2 h-4 w-4" />
            {page.name}
          </Button>
        ))}
      </nav>

      <div className="mt-4">
        {isAdding ? (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="New page name..."
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="h-9"
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button size="sm" onClick={handleAddPage}>Add</Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Page
          </Button>
        )}
      </div>
    </aside>
  );
}
