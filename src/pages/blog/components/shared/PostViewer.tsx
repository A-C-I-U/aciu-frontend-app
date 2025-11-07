import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'

const extensions = [
    TextStyleKit,
    StarterKit,
    Image,
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
    }),
]

export default function PostViewer({ content }: { content: any }) {
  const editor = useEditor({
    extensions,
    content,
    editable: false,
  })

  return (
    <div className="cursor-defaults">
      <EditorContent editor={editor} />
    </div>
  )
}