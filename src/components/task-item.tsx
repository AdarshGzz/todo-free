'use client';

import type { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reorder, useDragControls, motion, AnimatePresence } from 'framer-motion';
import { PointerEvent, useState, useTransition } from 'react';
import { rephraseTask } from '@/ai/flows/rephrase-task';
import { useToast } from '@/hooks/use-toast';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateContent: (id: string, newContent: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdateContent }: TaskItemProps) {
  const dragControls = useDragControls();
  const [isRephrasing, startRephraseTransition] = useTransition();
  const { toast } = useToast();
  const [highlight, setHighlight] = useState(false);
  const [content, setContent] = useState(task.content);

  const startDrag = (event: PointerEvent) => {
    dragControls.start(event);
  };

  const handleRephrase = () => {
    startRephraseTransition(async () => {
      try {
        const result = await rephraseTask({ task: content });
        if (result && result.rephrasedTask) {
          onUpdateContent(task.id, result.rephrasedTask);
          setContent(result.rephrasedTask);
          setHighlight(true);
          setTimeout(() => setHighlight(false), 1500); // Highlight for 1.5s
        }
      } catch (error) {
        console.error('Failed to rephrase task:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to rephrase task. Please try again.',
        });
      }
    });
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
      className={cn(
        "group flex items-center gap-2 rounded-md bg-secondary p-2 transition-all duration-200 ease-in-out hover:bg-secondary/80 will-change-transform",
        highlight && 'bg-primary/20'
      )}
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
      <motion.label
        htmlFor={`task-${task.id}`}
        className={cn(
          'flex-1 cursor-pointer text-sm transition-colors',
          task.completed && 'text-muted-foreground line-through'
        )}
        key={content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.label>
      
      <div className='flex items-center opacity-0 transition-opacity group-hover:opacity-100'>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRephrase}
          disabled={isRephrasing}
          className="h-7 w-7"
        >
          {isRephrasing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-primary" />}
          <span className="sr-only">Rephrase task</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-7 w-7"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Delete task</span>
        </Button>
      </div>
    </Reorder.Item>
  );
}
