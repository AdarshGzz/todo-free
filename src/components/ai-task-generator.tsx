
'use client';

import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateTasks } from '@/ai/flows/generate-tasks';
import { useToast } from '@/hooks/use-toast';


interface AITaskGeneratorProps {
  onTasksGenerated: (tasks: string[]) => void;
  disabled?: boolean;
  onGenerationStart?: () => void;
  onGenerationEnd?: () => void;
}

export function AITaskGenerator({ onTasksGenerated, disabled, onGenerationStart, onGenerationEnd }: AITaskGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isPending) return;

    onGenerationStart?.();
    startTransition(async () => {
      try {
        const result = await generateTasks({ topic });
        if (result && result.tasks) {
          onTasksGenerated(result.tasks);
          setTopic('');
          toast({
            title: "Tasks Generated!",
            description: `AI created ${result.tasks.length} tasks for "${topic}".`
          })
        } else {
            throw new Error("AI did not return any tasks.")
        }
      } catch (error) {
        console.error('Failed to generate tasks:', error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate tasks. Please try again."
        })
      } finally {
        onGenerationEnd?.();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="e.g., Plan a trip to Japan"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={isPending || disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending || disabled || !topic.trim()}>
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Generate
      </Button>
    </form>
  );
}
