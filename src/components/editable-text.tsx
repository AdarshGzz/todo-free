
'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, FocusEvent } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
}

export function EditableText({ initialValue, onSave, className }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);
  
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])

  const handleSave = () => {
    if (value.trim() && value.trim() !== initialValue) {
      onSave(value.trim());
    } else {
      setValue(initialValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    // Check if the blur was caused by clicking outside the input
    // and not by an action that should keep it open.
    // A small delay helps in case focus shifts to another element within the component.
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        handleSave();
      }
    }, 100);
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={cn("h-auto p-0 m-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0", className)}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={cn("cursor-pointer hover:bg-secondary/80 rounded-md p-0", className)}
    >
      {value}
    </span>
  );
}
