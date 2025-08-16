
'use client';

import React from 'react';
import { useTasksStore } from '@/hooks/use-tasks-store';
import { Sidebar } from '@/components/sidebar';
import { TaskList } from '@/components/task-list';
import { AITaskGenerator } from '@/components/ai-task-generator';
import { AnimatePresence, motion } from 'framer-motion';

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
    <div className="flex h-screen w-full bg-background font-body">
      <Sidebar
        pages={pages}
        activePageId={activePageId}
        onSelectPage={setActivePageId}
        onAddPage={addPage}
        onRenamePage={renamePage}
        onDeletePage={deletePage}
      />
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-4 md:p-8">
          <AITaskGenerator onTasksGenerated={handleAiTasksGenerated} disabled={!activePage} />
          
          <AnimatePresence mode="wait">
            {activePage ? (
              <motion.div
                key={activePage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-1 items-center justify-center"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">No Page Selected</h2>
                  <p className="text-muted-foreground">Create or select a page to get started.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
