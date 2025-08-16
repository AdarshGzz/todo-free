
'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, FocusEvent } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
  isEditingInitially?: boolean;
  onCancel?: () => void;
  inputClassName?: string;
}

export function EditableText({ initialValue, onSave, className, isEditingInitially = false, onCancel, inputClassName }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(isEditingInitially);
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
    } else if (!value.trim()) {
        setValue(initialValue); // Revert if the input is empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
      onCancel?.();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    // Check if the related target (where the focus is going) is part of the same component
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
        return;
    }
    handleSave();
  };
  
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={cn(
            "h-auto p-0 m-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent",
            className, // Inherit typography from parent
            inputClassName
        )}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={cn("cursor-pointer hover:bg-secondary/80 rounded-md p-0", className)}
    >
      {value}
    </span>
  );
}
