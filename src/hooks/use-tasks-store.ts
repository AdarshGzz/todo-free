'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Page, Task } from '@/lib/types';

const initialData: { pages: Page[]; activePageId: string | null } = {
  pages: [
    {
      id: 'work',
      name: 'Work',
      tasks: [
        { id: 'work-1', content: 'Finish project report', completed: false },
        { id: 'work-2', content: 'Reply to client emails', completed: false },
        { id: 'work-3', content: 'Prepare for team meeting', completed: true },
      ],
    },
    {
      id: 'personal',
      name: 'Personal',
      tasks: [
        { id: 'personal-1', content: 'Go grocery shopping', completed: false },
        { id: 'personal-2', content: 'Book flight tickets', completed: false },
      ],
    },
  ],
  activePageId: 'work',
};

const STORAGE_KEY = 'focus-flow-data';

export function useTasksStore() {
  const [pages, setPages] = useState<Page[]>([]);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        const data = JSON.parse(item);
        setPages(data.pages);
        setActivePageId(data.activePageId);
      } else {
        setPages(initialData.pages);
        setActivePageId(initialData.activePageId);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
      setPages(initialData.pages);
      setActivePageId(initialData.activePageId);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const data = JSON.stringify({ pages, activePageId });
        window.localStorage.setItem(STORAGE_KEY, data);
      } catch (error) {
        console.error('Failed to save data to localStorage', error);
      }
    }
  }, [pages, activePageId, isLoaded]);
  
  const getActivePage = useCallback(() => {
    return pages.find((p) => p.id === activePageId) || null;
  }, [pages, activePageId]);

  const addPage = (name: string) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name,
      tasks: [],
    };
    setPages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
  };

  const updatePageTasks = (pageId: string, newTasks: Task[]) => {
    setPages((prev) =>
      prev.map((p) => (p.id === pageId ? { ...p, tasks: newTasks } : p))
    );
  };
  
  const addTask = (pageId: string, content: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      content,
      completed: false,
    };
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      updatePageTasks(pageId, [...page.tasks, newTask]);
    }
  };

  const toggleTask = (pageId: string, taskId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      const newTasks = page.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      updatePageTasks(pageId, newTasks);
    }
  };

  const deleteTask = (pageId: string, taskId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      const newTasks = page.tasks.filter((t) => t.id !== taskId);
      updatePageTasks(pageId, newTasks);
    }
  };

  const reorderTasks = (pageId: string, reorderedTasks: Task[]) => {
    updatePageTasks(pageId, reorderedTasks);
  };

  const addGeneratedTasks = (pageId: string, taskContents: string[]) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      const newTasks: Task[] = taskContents.map((content) => ({
        id: `task-${Date.now()}-${Math.random()}`,
        content,
        completed: false,
      }));
      updatePageTasks(pageId, [...page.tasks, ...newTasks]);
    }
  };

  return {
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
  };
}
