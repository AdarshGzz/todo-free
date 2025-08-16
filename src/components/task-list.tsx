'use client';

import React, { useState, useRef, FormEvent } from 'react';
import type { Page, Task } from '@/lib/types';
import { TaskItem } from '@/components/task-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskListProps {
  page: Page;
  onAddTask: (content: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onReorderTasks: (startIndex: number, endIndex: number) => void;
}

export function TaskList({
  page,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onReorderTasks,
}: TaskListProps) {
  const [newTaskContent, setNewTaskContent] = useState('');
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskContent.trim()) {
      onAddTask(newTaskContent.trim());
      setNewTaskContent('');
    }
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };
  
  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      onReorderTasks(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{page.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {page.tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
            />
          ))}
           {page.tasks.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
                <p>No tasks yet. Add one below!</p>
            </div>
          )}
        </div>
        <form onSubmit={handleAddTask} className="mt-6 flex items-center gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Task</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
