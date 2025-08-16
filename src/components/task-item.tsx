'use client';

import type { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: TaskItemProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className="group flex items-center gap-2 rounded-md bg-secondary p-2 transition-all duration-200 ease-in-out hover:bg-secondary/80"
    >
      <div className="cursor-grab touch-none" onTouchStart={onDragStart}>
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="transition-transform duration-200 ease-in-out group-hover:scale-110"
      />
      <label
        htmlFor={`task-${task.id}`}
        className={cn(
          'flex-1 cursor-pointer text-sm transition-colors',
          task.completed && 'text-muted-foreground line-through'
        )}
      >
        {task.content}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Delete task</span>
      </Button>
    </div>
  );
}
