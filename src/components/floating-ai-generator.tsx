
'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AITaskGenerator } from './ai-task-generator';

interface FloatingAIGeneratorProps {
  onTasksGenerated: (tasks: string[]) => void;
  disabled?: boolean;
}

export function FloatingAIGenerator({ onTasksGenerated, disabled }: FloatingAIGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTasksGenerated = (tasks: string[]) => {
    onTasksGenerated(tasks);
    setIsOpen(false); 
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-16 right-0 w-80 sm:w-96"
            >
              <Card className="overflow-hidden shadow-2xl ring-1 ring-border">
                <CardHeader>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Sparkles className="text-primary h-5 w-5" />
                    <span>AI Task Generator</span>
                  </CardTitle>
                  <CardDescription>
                    Let AI generate a to-do list for any topic.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AITaskGenerator 
                    onTasksGenerated={handleTasksGenerated} 
                    disabled={disabled}
                    onGenerationEnd={() => setIsOpen(false)}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="h-14 w-14 rounded-full shadow-lg"
              size="icon"
            >
              <AnimatePresence>
                {isOpen ? (
                    <motion.div key="close" initial={{opacity: 0, rotate: -90}} animate={{opacity: 1, rotate: 0}} exit={{opacity: 0, rotate: 90}}>
                        <X className="h-6 w-6" />
                    </motion.div>
                ) : (
                    <motion.div key="open" initial={{opacity: 0, rotate: 90}} animate={{opacity: 1, rotate: 0}} exit={{opacity: 0, rotate: -90}}>
                        <Sparkles className="h-6 w-6" />
                    </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle AI Task Generator</span>
            </Button>
        </motion.div>
      </div>
    </>
  );
}
