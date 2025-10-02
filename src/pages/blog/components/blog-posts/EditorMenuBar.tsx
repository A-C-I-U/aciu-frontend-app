import { 
    EditorButton, 
    type Alignment, 
    type GenericAction, 
    type Level, 
    type ToggleAction 
} from "@/components/EditorMenuButton"
import { IconButton } from "@mui/material"
import { useEditorState, type Editor } from "@tiptap/react"
import { 
    CaretDown,
    CaretUp,
    ImageSquare,
    TextAa,
} from "phosphor-react"

const sizes = [
    { value: '12px', label: '12' },
    { value: '16px', label: '16' },
    { value: '20px', label: '20' },
    { value: '24px', label: '24' },
    { value: '32px', label: '32' },
]

export default function EditorMenuBar({ editor }: { editor: Editor}) {

    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                color: ctx.editor?.getAttributes('textStyle').color ?? null,
                isBold: ctx.editor?.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor?.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        }
    })

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Simulate an upload process to backend here
        const url = '';

        editor.chain().focus().setImage({ src: url }).run();
    }

    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="flex flex-wrap items-center">
                <div className="button-group border-b border-b-aciu-dashboard-background">
                    <IconButton
                        onClick={() => document.getElementById('fileInput')?.click()}
                        size="small"
                        title="Insert Image"
                        sx={{
                            color: "#3E3E3E",
                        }}
                        className="editor-button"
                    >
                        <ImageSquare weight="bold" size={18} />
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display: "none" }} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                    </IconButton>
                    {([ "undo", "redo"] as GenericAction[]).map(action => (
                        <EditorButton
                            key={action}
                            config={{ type: 'generic', action: action }}
                            editor={editor}
                            weight="Bold"
                        />
                    ))}
                </div>
                <div className="p-2 flex items-center border-x border-x-aciu-dashboard-background border-b border-b-aciu-dashboard-background">
                    <div className="flex flex-col w-full max-w-fit justify-center items-center p-2">
                        <TextAa size={14} color={editorState.color ?? "#3E3E3E"} />
                        <input 
                            type="color" 
                            value={editorState.color ?? "#3E3E3E"} 
                            onChange={e => editor.chain().focus().setColor(e.target.value).run()} 
                            className="h-1 w-full"
                        />
                    </div>
                    {([ "bold", "italic", "strike", "underline"] as ToggleAction[]).map(action => (
                        <EditorButton
                            key={action}
                            config={{ type: "toggle", action: action }}
                            editor={editor}
                            weight="bold"
                        />
                    ))}
                </div>
                <div className="relative py-2 px-3 border-x border-x-aciu-dashboard-background flex gap-1 items-center">
                    <select
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '16px') {
                                editor.commands.unsetFontSize();
                            } else {
                                editor.commands.setFontSize(value);
                            }
                        }}
                        value={editor.getAttributes('textStyle').fontSize || '16px'}
                        className="block font-plus-jakarta-sans font-bold text-sm appearance-none"
                        title="Font Size"
                    >
                        {/* <option value="16px">Default (16px)</option> */}
                        {sizes.map(({ value, label }) => (
                            <option key={value} value={value} className="font-plus-jakarta-sans font-bold text-sm">
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className="flex flex-col">
                        <CaretUp size={8} color="#3E3E3E" />
                        <CaretDown size={8} color="#3E3E3E" />
                    </div>
                </div>
                <div className="border-x border-b border-x-aciu-dashboard-background border-b-aciu-dashboard-background">
                    {([ "left", "center", "right"] as Alignment[]).map(alignment => (
                        <EditorButton
                            key={alignment}
                            config={{ type: 'alignment', alignment: alignment}}
                            editor={editor}
                            weight="bold"
                        />
                    ))}
                </div>

                <div className="border-r border-r-aciu-dashboard-background">
                    {([ 1, 2, 3, 4, 5] as Level[]).map(level => (
                        <EditorButton
                            key={level}
                            config={{ type: 'heading', level: level }}
                            editor={editor}
                            weight="bold"
                        />
                    ))}
                </div>
                

                {([ "orderedList", "bulletList"] as GenericAction[]).map(action => (
                    <EditorButton
                        key={action}
                        config={{ type: 'generic', action: action }}
                        editor={editor}
                        weight="bold"
                    />
                ))}
            </div>
        </div>
    )
}