
'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, LayoutList, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusFlowLogo } from '@/components/icons';
import { EditableText } from './editable-text';

interface SidebarProps {
  pages: Page[];
  activePageId: string | null;
  onSelectPage: (id: string) => void;
  onAddPage: () => void;
  onRenamePage: (id: string, name: string) => void;
  onDeletePage: (id: string) => void;
}

export function Sidebar({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onRenamePage,
  onDeletePage,
}: SidebarProps) {
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  const handleDeleteConfirmation = () => {
    if (pageToDelete) {
      onDeletePage(pageToDelete);
      setPageToDelete(null);
    }
  };

  const handleSaveRename = (pageId: string, newName: string) => {
    onRenamePage(pageId, newName);
    setEditingPageId(null);
  };

  return (
    <>
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
                {editingPageId === page.id ? (
                    <EditableText
                      initialValue={page.name}
                      onSave={(newName) => handleSaveRename(page.id, newName)}
                      className="w-full flex-1 text-left"
                      isEditingInitially={true}
                      onCancel={() => setEditingPageId(null)}
                    />
                  ) : (
                    <span className="w-full flex-1 text-left truncate">{page.name}</span>
                  )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Page options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setEditingPageId(page.id);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setPageToDelete(page.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page and all its tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPageToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirmation} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
