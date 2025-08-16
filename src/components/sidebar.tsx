
'use client';

import React, { useState } from 'react';
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
import { Plus, LayoutList, MoreHorizontal, Trash2, Edit, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusFlowLogo } from '@/components/icons';
import { EditableText } from './editable-text';
import { 
  Sidebar as RootSidebar, 
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar
} from '@/components/ui/sidebar';
import { AnimatePresence, motion } from 'framer-motion';

interface AppSidebarProps {
  pages: Page[];
  activePageId: string | null;
  onSelectPage: (id: string) => void;
  onAddPage: () => void;
  onRenamePage: (id: string, name: string) => void;
  onDeletePage: (id: string) => void;
}

export function AppSidebar({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onRenamePage,
  onDeletePage,
}: AppSidebarProps) {
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const { state: sidebarState } = useSidebar();

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
      <RootSidebar collapsible="icon">
        <SidebarHeader className='p-2'>
          <div className="flex items-center gap-2 p-2">
            <FocusFlowLogo className="h-7 w-7 text-primary" />
             <AnimatePresence>
              {sidebarState === 'expanded' && (
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="font-headline text-2xl font-bold text-foreground"
                >
                  FocusFlow
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </SidebarHeader>

        <SidebarContent className='p-2'>
          <SidebarMenu>
            {pages.map((page) => (
              <SidebarMenuItem key={page.id}>
                 <SidebarMenuButton
                  isActive={activePageId === page.id}
                  onClick={() => {
                    if (editingPageId !== page.id) {
                      onSelectPage(page.id);
                    }
                  }}
                  tooltip={{
                    children: page.name,
                    side: 'right',
                  }}
                  className="flex items-center justify-between"
                >
                  <div 
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      if (editingPageId === page.id) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <LayoutList />
                    {editingPageId === page.id ? (
                      <EditableText
                        initialValue={page.name}
                        onSave={(newName) => handleSaveRename(page.id, newName)}
                        isEditingInitially={true}
                        onCancel={() => setEditingPageId(null)}
                      />
                    ) : (
                      <span>{page.name}</span>
                    )}
                  </div>
                </SidebarMenuButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                       <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="right">
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setEditingPageId(page.id); }}>
                      <Pencil className="mr-2" />
                      <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setPageToDelete(page.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className='p-2'>
           <SidebarMenuButton
              onClick={onAddPage}
              tooltip={{
                children: 'New Page',
                side: 'right',
              }}
           >
            <Plus />
            <span>New Page</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </RootSidebar>

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
