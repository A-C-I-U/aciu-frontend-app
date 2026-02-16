import { publicationStatusMap } from "@/utils/helpers";
import { Form, Formik } from "formik";
import { CheckIcon, Loader2 } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react'
import { FormLabel } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading';
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FormikField from "@/components/FormikField";
import EditorMenuBar from "./EditorMenuBar";
import { useEffect, useRef, useState, useCallback } from "react";
import { CloudIcon } from "@/components/Icons";
import type { BlogPostFormValues } from "@/utils/types";
import { fields } from "@/utils/data";
import { useCreateBlogPost } from "@/services/hooks/blogs";
import { BlogPostVisibility } from "@/services/types/blogs";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const extensions = [
    StarterKit,
    TextStyle,
    Color,
    Image,
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph']
    }),
    Heading.configure({
        levels: [1, 2, 3, 4, 5, 6]
    })
]

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    tags: Yup.string().required("At least one tag is required"),
    displayImage: Yup.mixed().required("Display image is required"),
    imageAlt: Yup.string().required("Image alt text is required"),
    content: Yup.string().required("Content is required"),
});

const AUTOSAVE_KEY = "blog-post-draft";
const AUTOSAVE_DELAY = 30000; // 30 seconds

export default function BlogPostForm({ type = "create" }: { type: "create" | "edit" }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const navigate = useNavigate();

    const { mutateAsync: createBlogPost, isPending: isPublishing } = useCreateBlogPost();

    const {
        label,
        labelColor,
        dotColor,
        bgColor
    } = publicationStatusMap["draft"];

    const editor = useEditor({
        content: "",
        extensions,
        editable: true
    })

    // Load draft from localStorage on mount
    const loadDraft = useCallback(() => {
        try {
            const savedDraft = localStorage.getItem(AUTOSAVE_KEY);
            if (savedDraft) {
                return JSON.parse(savedDraft);
            }
        } catch (error) {
            console.error("Error loading draft:", error);
        }
        return null;
    }, []);

    const initialValues: BlogPostFormValues = loadDraft() || {
        title: "",
        description: "",
        content: "",
        contentHtml: "",
        contentJson: null,
        tags: "",
        displayImage: null,
        imageAlt: "",
        postVisibility: BlogPostVisibility.PUBLIC,
        status: "draft",
        featured: false
    }

    const handleSubmit = async (values: BlogPostFormValues) => {
        try {
            if (!values.displayImage) {
                enqueueSnackbar("Please upload a display image", { variant: "error" });
                return;
            }

            if (!values.contentHtml || values.contentHtml.trim() === "" || values.contentHtml === "<p></p>") {
                enqueueSnackbar("Please add some content to your post", { variant: "error" });
                return;
            }

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("contentHtml", values.contentHtml || "");
            formData.append("contentJson", JSON.stringify(values.contentJson || {}));

            const tagsArray = typeof values.tags === 'string'
                ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
                : values.tags.filter(tag => tag.trim() !== '');
            formData.append("tags", JSON.stringify(tagsArray));
            formData.append("displayImageAlt", values.imageAlt);
            formData.append("visibility", values.postVisibility);
            formData.append("featured", String(values.featured || false));

            if (values.displayImage) {
                formData.append("displayImage", values.displayImage);
            }

            const response = await createBlogPost(formData);

            // Clear localStorage on success
            localStorage.removeItem(AUTOSAVE_KEY);

            enqueueSnackbar(response.message || "Blog post created successfully!", { variant: "success" });

            setTimeout(() => {
                navigate("/blog");
            }, 1500);

        } catch (error: any) {
            console.error("Error creating blog post:", error);
            enqueueSnackbar(
                error?.response?.data?.message || "Failed to create blog post",
                { variant: "error" }
            );
        }
    }

    return (
        <div className="mt-4 flex flex-col gap-[.875rem]">
            <div
                className="p-4 flex flex-col gap-6 
                md:items-center md:flex-row md:justify-between md:gap-0 
                bg-white md:mx-5 rounded-lg"
            >
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold font-montserrat text-aciu-border-grey text-xl">
                        {type !== "create" ? "Edit Post" : "Create New Post"}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span
                            style={{
                                backgroundColor: bgColor,
                                color: labelColor,
                                height: "2rem"
                            }}
                            className="py-[2px] pr-2 pl-[6px] whitespace-nowrap
                                flex gap-[6px] items-center rounded-[1rem]
                                text-xs font-montserrat font-medium max-w-fit"
                        >
                            <span style={{
                                backgroundColor: dotColor
                            }} className="w-[6px] h-[6px] rounded-full"></span>
                            {label}
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    {isSaving ? (
                        <p className="md:flex items-center gap-1 hidden">
                            <Loader2 size={16} className="animate-spin text-aciu-green-normal" />
                            <span className="font-montserrat text-sm font-semibold text-aciu-border-grey">
                                Saving...
                            </span>
                        </p>
                    ) : lastSaved ? (
                        <p className="md:flex items-center gap-1 hidden">
                            <span
                                className="w-4 h-4 bg-aciu-green-normal 
                                flex items-center justify-center rounded-full"
                            >
                                <CheckIcon size={10} color="white" />
                            </span>
                            <span className="font-montserrat text-sm font-semibold text-aciu-border-grey">
                                Saved
                            </span>
                        </p>
                    ) : null}
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    isSubmitting
                }) => {
                    // Sync editor content to Formik
                    useEffect(() => {
                        if (!editor) return;

                        const handleUpdate = () => {
                            const html = editor.getHTML();
                            const json = editor.getJSON();
                            setFieldValue("content", html);
                            setFieldValue("contentHtml", html);
                            setFieldValue("contentJson", json);
                        }

                        editor.on("update", handleUpdate);

                        return () => {
                            editor.off("update", handleUpdate);
                        }
                    }, [editor, setFieldValue]);

                    // Initialize editor with saved content
                    useEffect(() => {
                        if (!editor || !values.contentHtml) return;
                        const currentContent = editor.getHTML();
                        if (values.contentHtml !== currentContent && values.contentHtml !== "<p></p>") {
                            editor.commands.setContent(values.contentHtml);
                        }
                    }, [editor]);

                    // Auto-save to localStorage
                    useEffect(() => {
                        const timer = setTimeout(() => {
                            setIsSaving(true);
                            try {
                                localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(values));
                                setLastSaved(new Date());
                            } catch (error) {
                                console.error("Error saving draft:", error);
                            } finally {
                                setTimeout(() => setIsSaving(false), 500);
                            }
                        }, AUTOSAVE_DELAY);

                        return () => clearTimeout(timer);
                    }, [values]);

                    return (
                        <Form className="md:mx-5 grid grid-cols-1 md:grid-cols-[3fr_1.5fr] gap-5 items-start py-4 px-3">
                            <div className="rounded-[.625rem] bg-white min-h-screen self-start flex flex-col">
                                <EditorMenuBar editor={editor} />
                                <EditorContent
                                    editor={editor}
                                    className="font-montserrat flex-1 w-full overflow-auto p-4
                                    outline-none focus:outline-none focus-visible:!outline-none prose max-w-none"
                                />
                            </div>

                            <div className="rounded-[.625rem] bg-white px-3 py-4 sticky top-4">
                                <div className="flex flex-col gap-4">
                                    {fields.map((field) => (
                                        <div key={field.name} className="flex flex-col gap-2">
                                            <FormLabel
                                                htmlFor={field.name}
                                                sx={{
                                                    fontWeight: 600,
                                                    fontFamily: '"Montserrat", sans-serif',
                                                    fontSize: ".75rem",
                                                    color: "#3E3E3E",
                                                }}
                                            >
                                                {field.label} {field.required &&
                                                    <span className="text-aciu-green-normal">*</span>
                                                }
                                            </FormLabel>

                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values[field.name as keyof typeof values] as string}
                                                placeholder={field.placeholder}
                                                className={`border border-grayscale-100 rounded-[.625rem] py-2 px-3
                                                focus:border-aciu-green-normal focus:ring-1 focus:ring-aciu-green-normal
                                                outline-none text-sm font-montserrat placeholder:text-gray-400 transition-all duration-150
                                                min-h-[10.75rem]`}
                                            />

                                            {touched[field.name as keyof typeof touched] &&
                                                errors[field.name as keyof typeof errors] && (
                                                    <span className="text-red-500 text-xs">
                                                        {String(errors[field.name as keyof typeof errors])}
                                                    </span>
                                                )}

                                            {field.helperText && (
                                                <p
                                                    className="font-montserrat font-medium text-2xs text-aciu-abriba"
                                                    dangerouslySetInnerHTML={{ __html: field.helperText }}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <div className="flex flex-col gap-2">
                                        <FormLabel
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: '"Montserrat", sans-serif',
                                                fontSize: ".75rem",
                                                color: "#3E3E3E"
                                            }}>
                                            Display Image&nbsp;
                                            <span className="text-aciu-green-normal">*</span>
                                        </FormLabel>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => inputRef.current?.click()}>
                                            {!imagePreview ?
                                                <div className="relative rounded-[5px]">
                                                    <div className="gap-2 flex flex-col relative">
                                                        <div className="border border-dashed border-aciu-green-normal
                                                            min-h-[10.75rem] rounded-[5px] min-w-[19.5rem] bg-aciu-cyan-light">
                                                            <div
                                                                className="absolute top-1/2 left-1/2 
                                                                    -translate-x-1/2 -translate-y-1/2 
                                                                    text-white font-coolvetica
                                                                    flex flex-col items-center gap-3">
                                                                <CloudIcon />
                                                                <p className="text-center text-aciu-abriba font-montserrat font-medium text-sm">
                                                                    Drag & drop or click to choose file
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-montserrat text-grayscale-400 text-sm">
                                                                Supported formats: jpeg,png
                                                            </p>
                                                            <p className="font-montserrat text-grayscale-400 text-sm">
                                                                Max: 10mb
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="flex flex-col gap-[.625rem] items-center">
                                                    <img
                                                        src={imagePreview}
                                                        alt={values.imageAlt || "Cover Preview"}
                                                        className="object-cover h-[8rem] rounded-[5px] min-w-[19.5rem]"
                                                    />
                                                    <div className="w-full self-end">
                                                        <p className="text-aciu-green-normal font-coolvetica text-2xs">
                                                            Edit Cover Image
                                                        </p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <input
                                            ref={inputRef}
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setFieldValue("displayImage", file);
                                                    const preview = URL.createObjectURL(file);
                                                    setImagePreview(preview);
                                                }
                                            }}
                                        />
                                        {touched.displayImage && errors.displayImage && (
                                            <span className="text-red-500 text-xs">
                                                {String(errors.displayImage)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-[6px] flex-col">
                                        <FormLabel
                                            sx={{
                                                fontWeight: 700,
                                                fontFamily: '"Montserrat", sans-serif',
                                                fontSize: "11px",
                                                color: "#1E293B"
                                            }}>
                                            Image Alt Text&nbsp;
                                        </FormLabel>
                                        <FormikField
                                            label=""
                                            name="imageAlt"
                                            type="text"
                                            placeholder="Describe the image above"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <FormLabel
                                            sx={{
                                                fontWeight: 600,
                                                fontFamily: '"Montserrat", sans-serif',
                                                color: "#3E3E3E"
                                            }}>
                                            Set Post Visibility&nbsp;
                                            <span className="text-aciu-green-normal">*</span>
                                        </FormLabel>
                                        <FormikField
                                            select
                                            label=""
                                            name="postVisibility"
                                            options={[
                                                { value: BlogPostVisibility.PUBLIC, label: "Public" },
                                                { value: BlogPostVisibility.AGE_GRADE, label: "Age Grade" },
                                                { value: BlogPostVisibility.Village, label: "Village" }
                                            ]}
                                            fullWidth
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isPublishing}
                                        className="font-coolvetica p-4 h-[56px] 
                                        rounded-[.75rem] bg-aciu-green-normal text-white
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        flex items-center justify-center gap-2"
                                    >
                                        {isPublishing && <Loader2 size={20} className="animate-spin" />}
                                        {isPublishing ? "Publishing..." : "Publish Post"}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>

        </div>
    )
}