'use client';

import type { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reorder, useDragControls } from 'framer-motion';
import { PointerEvent } from 'react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const dragControls = useDragControls();
  
  const startDrag = (event: PointerEvent) => {
    dragControls.start(event);
  };

  return (
    <Reorder.Item
      value={task}
      id={task.id}
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className="group flex items-center gap-2 rounded-md bg-secondary p-2 transition-all duration-200 ease-in-out hover:bg-secondary/80 will-change-transform"
    >
      <div 
        onPointerDown={startDrag} 
        className="cursor-grab touch-none p-1"
      >
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
    </Reorder.Item>
  );
}
