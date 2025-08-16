
'use client';

import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold, Italic, Underline, Strikethrough, Code, Link, List, ListOrdered, Heading2
} from 'lucide-react';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import UnderlineExtension from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';

interface RichTextEditorProps {
  initialContent: string;
  onUpdate: (content: string) => void;
  editable?: boolean;
}

const editorProseClasses = "prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-headline max-w-none focus:outline-none";


export function RichTextEditor({ initialContent, onUpdate, editable = true }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
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
  
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
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
            onClick={setLink}
            className={cn('p-2 rounded hover:bg-secondary', editor.isActive('link') ? 'bg-secondary' : '')}
            aria-label="Set Link"
          >
            <Link className="h-4 w-4" />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
}
