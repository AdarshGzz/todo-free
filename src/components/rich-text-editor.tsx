
'use client';

import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold, Italic, Underline, Strikethrough, Code, Link, List, ListOrdered, Heading2
} from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import UnderlineExtension from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  initialContent: string;
  onUpdate: (content: string) => void;
  editable?: boolean;
}

const editorProseClasses = "prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-headline max-w-none focus:outline-none";


export function RichTextEditor({ initialContent, onUpdate, editable = true }: RichTextEditorProps) {
  const [isLinkEditOpen, setIsLinkEditOpen] = useState(false);
  const [url, setUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: true, // Set to true to allow clicking links
        autolink: true,
      }),
    ],
    content: initialContent,
    editable,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: editorProseClasses,
      },
    },
  });
  
  useEffect(() => {
    if (editor && isLinkEditOpen) {
      setUrl(editor.getAttributes('link').href || '');
    }
  }, [editor, isLinkEditOpen]);


  const handleSetLink = useCallback(() => {
    if (!editor) return;

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setIsLinkEditOpen(false);
    setUrl('');
  }, [editor, url]);

  const openLinkDialog = useCallback(() => {
    if (editor) {
      const existingUrl = editor.getAttributes('link').href;
      setUrl(existingUrl || '');
      setIsLinkEditOpen(true);
    }
  }, [editor]);


  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex items-center gap-1 p-1 bg-background border border-border rounded-lg shadow-xl"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn('p-2 rounded hover:bg-secondary', editor.isActive('bold') ? 'bg-secondary' : '')}
            aria-label="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn('p-2 rounded hover:bg-secondary', editor.isActive('italic') ? 'bg-secondary' : '')}
             aria-label="Italic"
         >
            <Italic className="h-4 w-4" />
          </button>
           <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn('p-2 rounded hover:bg-secondary', editor.isActive('underline') ? 'bg-secondary' : '')}
            aria-label="Underline"
          >
            <Underline className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn('p-2 rounded hover:bg-secondary', editor.isActive('strike') ? 'bg-secondary' : '')}
             aria-label="Strikethrough"
         >
            <Strikethrough className="h-4 w-4" />
          </button>
           <button
            onClick={openLinkDialog}
            className={cn('p-2 rounded hover:bg-secondary', editor.isActive('link') ? 'bg-secondary' : '')}
            aria-label="Set Link"
          >
            <Link className="h-4 w-4" />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />

      <Dialog open={isLinkEditOpen} onOpenChange={setIsLinkEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSetLink();
                    }
                }}
              />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSetLink}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
