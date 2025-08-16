'use client';

import React from 'react';
import { useTasksStore } from '@/hooks/use-tasks-store';
import { Sidebar } from '@/components/sidebar';
import { TaskList } from '@/components/task-list';
import { AITaskGenerator } from '@/components/ai-task-generator';
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
  } = useTasksStore();

  const activePage = getActivePage();

  const handleAiTasksGenerated = async (tasks: string[]) => {
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
      />
      <main className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-4 md:p-8">
          <AITaskGenerator onTasksGenerated={handleAiTasksGenerated} disabled={!activePage} />
          {activePage ? (
            <TaskList
              key={activePage.id}
              page={activePage}
              onAddTask={(content) => addTask(activePage.id, content)}
              onToggleTask={(taskId) => toggleTask(activePage.id, taskId)}
              onDeleteTask={(taskId) => deleteTask(activePage.id, taskId)}
              onReorderTasks={(startIndex, endIndex) =>
                reorderTasks(activePage.id, startIndex, endIndex)
              }
            />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">No Page Selected</h2>
                <p className="text-muted-foreground">Create or select a page to get started.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
