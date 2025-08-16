
'use client';

import React, { useState, FormEvent } from 'react';
import type { Page, Task } from '@/lib/types';
import { TaskItem } from '@/components/task-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { EditableText } from './editable-text';

interface TaskListProps {
  page: Page;
  onAddTask: (content: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onReorderTasks: (reorderedTasks: Task[]) => void;
  onRenamePage: (name: string) => void;
  onUpdateTaskContent: (taskId: string, newContent: string) => void;
}

export function TaskList({
  page,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onReorderTasks,
  onRenamePage,
  onUpdateTaskContent,
}: TaskListProps) {
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskContent.trim()) {
      onAddTask(newTaskContent.trim());
      setNewTaskContent('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <EditableText 
            initialValue={page.name}
            onSave={onRenamePage}
            className="font-headline text-3xl"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Reorder.Group
          axis="y"
          values={page.tasks}
          onReorder={onReorderTasks}
          className="space-y-2"
        >
          {page.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onUpdateContent={onUpdateTaskContent}
            />
          ))}
        </Reorder.Group>
        
        {page.tasks.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>No tasks yet. Add one below!</p>
          </div>
        )}
        
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
