import { useUploadEditorImage } from "@/services/mutations/blogs"
import { IconButton, Tooltip, CircularProgress } from "@mui/material"
import { useEditorState, type Editor } from "@tiptap/react"
import {
    CaretDown,
    CaretUp,
    ImageSquare,
    TextAa,
    TextBolder,
    TextItalic,
    TextStrikethrough,
    TextUnderline,
    TextAlignLeft,
    TextAlignCenter,
    TextAlignRight,
    ListBullets,
    ListNumbers,
    ArrowCounterClockwise,
    ArrowClockwise,
} from "phosphor-react"
import { useRef } from "react"

const sizes = [
    { value: '12px', label: '12' },
    { value: '14px', label: '14' },
    { value: '16px', label: '16' },
    { value: '18px', label: '18' },
    { value: '20px', label: '20' },
    { value: '24px', label: '24' },
    { value: '32px', label: '32' },
]

const btnBase = {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    color: "#3E3E3E",
    '&:hover': { backgroundColor: '#F1F5F9' },
}

const activeBtnSx = {
    ...btnBase,
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    '&:hover': { backgroundColor: '#C8E6C9' },
}

interface ToolbarButtonProps {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    title: string
    children: React.ReactNode
}

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
    return (
        <Tooltip title={title} placement="top" arrow>
            <span>
                <IconButton
                    onClick={onClick}
                    disabled={disabled}
                    size="small"
                    sx={active ? activeBtnSx : { ...btnBase, '&.Mui-disabled': { opacity: 0.35 } }}
                >
                    {children}
                </IconButton>
            </span>
        </Tooltip>
    )
}

function Divider() {
    return <div className="w-[1px] h-6 bg-gray-200 mx-1 flex-shrink-0" />
}

export default function EditorMenuBar({ editor }: { editor: Editor | null }) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const colorInputRef = useRef<HTMLInputElement>(null)
    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadEditorImage()

    const editorState = useEditorState({
        editor,
        selector: ctx => {
            if (!ctx.editor) return {
                color: null, isBold: false, isItalic: false, isStrike: false,
                isUnderline: false, isParagraph: false,
                isHeading1: false, isHeading2: false, isHeading3: false,
                isBulletList: false, isOrderedList: false,
                isAlignLeft: false, isAlignCenter: false, isAlignRight: false,
                canUndo: false, canRedo: false,
                fontSize: '16px',
            }
            return {
                color: ctx.editor.getAttributes('textStyle').color ?? null,
                isBold: ctx.editor.isActive('bold'),
                isItalic: ctx.editor.isActive('italic'),
                isStrike: ctx.editor.isActive('strike'),
                isUnderline: ctx.editor.isActive('underline'),
                isParagraph: ctx.editor.isActive('paragraph'),
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
                isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
                isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
                canUndo: ctx.editor.can().undo(),
                canRedo: ctx.editor.can().redo(),
                fontSize: ctx.editor.getAttributes('textStyle').fontSize ?? '16px',
            }
        }
    })

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file || !editor) return

        try {
            const { url } = await uploadImage(file)
            editor.chain().focus().setImage({ src: url }).run()
        } catch (error) {
            console.error("Failed to upload image:", error)
        } finally {
            // Reset so the same file can be selected again
            event.target.value = ''
        }
    }

    if (!editor) return null

    const iconSize = 17

    return (
        <div className="border-b border-gray-200 py-2 px-4 flex flex-wrap items-center gap-1 bg-white rounded-t-[.625rem]">

            {/* Undo / Redo */}
            <div className="flex items-center gap-1">
                <ToolbarButton
                    title="Undo (Ctrl+Z)"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState?.canUndo}
                >
                    <ArrowCounterClockwise size={iconSize} weight="bold" />
                </ToolbarButton>
                <ToolbarButton
                    title="Redo (Ctrl+Y)"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState?.canRedo}
                >
                    <ArrowClockwise size={iconSize} weight="bold" />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Image upload */}
            <div className="flex items-center gap-1">
                <ToolbarButton
                    title="Insert Image"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        <ImageSquare size={iconSize} weight="bold" />
                    )}
                </ToolbarButton>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>

            <Divider />

            {/* Text color */}
            <div className="flex items-center gap-1">
                <Tooltip title="Text Color" placement="top" arrow>
                    <div
                        className="flex flex-col items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 cursor-pointer relative overflow-hidden"
                        onClick={() => colorInputRef.current?.click()}
                    >
                        <TextAa size={iconSize} weight="bold" color={editorState?.color ?? "#3E3E3E"} />
                        {/* Color underline indicator */}
                        <div
                            className="absolute bottom-1 left-2 right-2 h-[2.5px] rounded-full"
                            style={{ backgroundColor: editorState?.color ?? '#3E3E3E' }}
                        />
                        <input
                            ref={colorInputRef}
                            type="color"
                            value={editorState?.color ?? "#000000"}
                            onChange={e => editor.chain().focus().setColor(e.target.value).run()}
                            className="absolute inset-0 opacity-0 cursor-pointer w-0 h-0"
                        />
                    </div>
                </Tooltip>

                {/* Bold */}
                <ToolbarButton
                    title="Bold (Ctrl+B)"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editorState?.isBold}
                >
                    <TextBolder size={iconSize} weight="bold" />
                </ToolbarButton>

                {/* Italic */}
                <ToolbarButton
                    title="Italic (Ctrl+I)"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editorState?.isItalic}
                >
                    <TextItalic size={iconSize} weight="bold" />
                </ToolbarButton>

                {/* Underline */}
                <ToolbarButton
                    title="Underline (Ctrl+U)"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editorState?.isUnderline}
                >
                    <TextUnderline size={iconSize} weight="bold" />
                </ToolbarButton>

                {/* Strikethrough */}
                <ToolbarButton
                    title="Strikethrough"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={editorState?.isStrike}
                >
                    <TextStrikethrough size={iconSize} weight="bold" />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Font size */}
            <div className="flex items-center gap-1 px-1">
                <div className="flex flex-col gap-0.5">
                    <button
                        type="button"
                        onClick={() => {
                            const current = editorState?.fontSize ?? '16px'
                            const currentIndex = sizes.findIndex(s => s.value === current)
                            if (currentIndex < sizes.length - 1) {
                                editor.chain().focus().setFontSize(sizes[currentIndex + 1].value).run()
                            }
                        }}
                        className="text-gray-400 hover:text-gray-700 transition-colors leading-none"
                    >
                        <CaretUp size={8} weight="bold" />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            const current = editorState?.fontSize ?? '16px'
                            const currentIndex = sizes.findIndex(s => s.value === current)
                            if (currentIndex > 0) {
                                editor.chain().focus().setFontSize(sizes[currentIndex - 1].value).run()
                            }
                        }}
                        className="text-gray-400 hover:text-gray-700 transition-colors leading-none"
                    >
                        <CaretDown size={8} weight="bold" />
                    </button>
                </div>
                <select
                    onChange={(e) => {
                        const value = e.target.value
                        if (value === '16px') {
                            editor.chain().focus().unsetFontSize().run()
                        } else {
                            editor.chain().focus().setFontSize(value).run()
                        }
                    }}
                    value={editorState?.fontSize ?? '16px'}
                    className="font-montserrat font-semibold text-sm outline-none bg-transparent cursor-pointer text-[#3E3E3E] w-10"
                >
                    {sizes.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            <Divider />

            {/* Text alignment */}
            <div className="flex items-center gap-1">
                <ToolbarButton
                    title="Align Left"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    active={editorState?.isAlignLeft}
                >
                    <TextAlignLeft size={iconSize} weight="bold" />
                </ToolbarButton>
                <ToolbarButton
                    title="Align Center"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    active={editorState?.isAlignCenter}
                >
                    <TextAlignCenter size={iconSize} weight="bold" />
                </ToolbarButton>
                <ToolbarButton
                    title="Align Right"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    active={editorState?.isAlignRight}
                >
                    <TextAlignRight size={iconSize} weight="bold" />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Headings + lists */}
            <div className="flex items-center gap-1">
                {([1, 2, 3] as const).map(level => (
                    <ToolbarButton
                        key={level}
                        title={`Heading ${level}`}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        active={editorState?.[`isHeading${level}` as 'isHeading1' | 'isHeading2' | 'isHeading3']}
                    >
                        <span className="font-bold font-montserrat text-[11px] leading-none">H{level}</span>
                    </ToolbarButton>
                ))}

                <ToolbarButton
                    title="Bullet List"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editorState?.isBulletList}
                >
                    <ListBullets size={iconSize} weight="bold" />
                </ToolbarButton>

                <ToolbarButton
                    title="Numbered List"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editorState?.isOrderedList}
                >
                    <ListNumbers size={iconSize} weight="bold" />
                </ToolbarButton>
            </div>
        </div>
    )
}