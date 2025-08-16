
'use client';

import React from 'react';
import { useTasksStore } from '@/hooks/use-tasks-store';
import { AppSidebar } from '@/components/sidebar';
import { TaskList } from '@/components/task-list';
import { AITaskGenerator } from '@/components/ai-task-generator';
import { AnimatePresence, motion } from 'framer-motion';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app-header';


export function FocusFlowApp() {
  const {
    pages,
    activePageId,
    setActivePageId,
    addPage,
    getActivePage,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    addGeneratedTasks,
    renamePage,
    deletePage,
  } = useTasksStore();

  const activePage = getActivePage();

  const handleAiTasksGenerated = (tasks: string[]) => {
    if (activePage) {
      addGeneratedTasks(activePage.id, tasks);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background font-body">
        <AppSidebar
          pages={pages}
          activePageId={activePageId}
          onSelectPage={setActivePageId}
          onAddPage={addPage}
          onRenamePage={renamePage}
          onDeletePage={deletePage}
        />
        <SidebarInset className="flex flex-col overflow-hidden">
          <AppHeader>
            <SidebarTrigger />
             <h2 className="font-headline text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {activePage?.name || 'FocusFlow'}
            </h2>
          </AppHeader>
          <main className="flex flex-1 flex-col gap-8 overflow-y-auto p-4 md:p-8">
            <AITaskGenerator onTasksGenerated={handleAiTasksGenerated} disabled={!activePage} />
            
            <AnimatePresence mode="wait">
              {activePage ? (
                <motion.div
                  key={activePage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="min-h-0"
                >
                  <TaskList
                    page={activePage}
                    onAddTask={(content) => addTask(activePage.id, content)}
                    onToggleTask={(taskId) => toggleTask(activePage.id, taskId)}
                    onDeleteTask={(taskId) => deleteTask(activePage.id, taskId)}
                    onReorderTasks={(reorderedTasks) =>
                      reorderTasks(activePage.id, reorderedTasks)
                    }
                    onRenamePage={(name) => renamePage(activePage.id, name)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="no-page"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex flex-1 items-center justify-center"
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">No Page Selected</h2>
                    <p className="text-muted-foreground">Create or select a page to get started.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
