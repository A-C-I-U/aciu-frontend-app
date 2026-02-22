import { publicationStatusMap } from "@/utils/helpers";
import { Form, Formik } from "formik";
import { CheckIcon, Loader2 } from "lucide-react";
import { ArrowLeft2 } from "iconsax-react";
import { useEditor, EditorContent } from '@tiptap/react'
import { FormLabel, Switch } from "@mui/material";
import { Skeleton } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading';
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FormikField from "@/components/FormikField";
import EditorMenuBar from "./EditorMenuBar";
import { useEffect, useRef, useState } from "react";
import { CloudIcon } from "@/components/Icons";
import type { BlogPostFormValues } from "@/utils/types";
import { useCreateBlogPost, useSaveBlogPostDraft } from "@/services/mutations/blogs";
import { BlogPostVisibility } from "@/services/types/blogs";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogPostDetails } from "@/services/hooks/blogs";
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

const BlogFormSkeleton = () => (
    <div className="mt-4 flex flex-col gap-6 md:mx-5">
        <div className="flex items-center mb-2">
            <Skeleton variant="rectangular" width={100} height={40} className="rounded-lg" />
        </div>
        <div className="bg-white rounded-[.75rem] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shadow-sm">
            <div className="flex flex-col gap-2">
                <Skeleton variant="text" width={200} height={32} />
                <Skeleton variant="text" width={150} height={16} />
            </div>
            <div className="flex gap-3">
                <Skeleton variant="rectangular" width={120} height={44} className="rounded-lg" />
                <Skeleton variant="rectangular" width={120} height={44} className="rounded-lg" />
            </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_24rem] gap-10">
            <div className="bg-white rounded-[.75rem] p-6 shadow-sm flex flex-col gap-6">
                <Skeleton variant="rectangular" width="100%" height={50} className="rounded-t-lg" />
                <Skeleton variant="rectangular" width="100%" height={400} className="rounded-b-lg" />
            </div>
            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-[.75rem] p-6 shadow-sm flex flex-col gap-6">
                    <Skeleton variant="rectangular" width="100%" height={56} className="rounded" />
                    <Skeleton variant="rectangular" width="100%" height={100} className="rounded" />
                    <Skeleton variant="rectangular" width="100%" height={56} className="rounded" />
                    <Skeleton variant="rectangular" width="100%" height={200} className="rounded" />
                    <Skeleton variant="rectangular" width="100%" height={56} className="rounded" />
                    <div className="flex justify-between items-center">
                        <Skeleton variant="text" width={100} height={24} />
                        <Skeleton variant="rectangular" width={50} height={24} className="rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function BlogPostForm({ type = "create" }: { type: "create" | "edit" }) {
    const { id } = useParams();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const navigate = useNavigate();

    const { mutateAsync: createBlogPost, isPending: isPublishing } = useCreateBlogPost();
    const { mutateAsync: saveDraft } = useSaveBlogPostDraft();
    const { data: postData, isLoading: isLoadingPost } = useBlogPostDetails(id as string);

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

    const [formInitialValues, setFormInitialValues] = useState<BlogPostFormValues>({
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
    });

    // Handle data pre-filling in edit mode
    useEffect(() => {
        if (postData?.post) {
            const { post } = postData;
            setFormInitialValues({
                title: post.title || "",
                description: post.description || "",
                content: post.contentHtml || "",
                contentHtml: post.contentHtml || "",
                contentJson: post.contentJson || null,
                tags: post.tags?.join(", ") || "",
                displayImage: null,
                imageAlt: post.displayImageAlt || "",
                postVisibility: (post.visibility as BlogPostVisibility) || BlogPostVisibility.PUBLIC,
                status: (post.status as any) || "draft",
                featured: post.featured || false
            });

            if (post.displayImage) {
                setImagePreview(post.displayImage);
            }

            if (editor && post.contentHtml && editor.getHTML() !== post.contentHtml) {
                editor.commands.setContent(post.contentHtml);
            }
        }
    }, [postData, editor]);

    const prepareFormData = (values: BlogPostFormValues) => {
        const formData = new FormData();
        formData.append("title", values.title || "");
        formData.append("description", values.description || "");
        formData.append("contentHtml", values.contentHtml || "");
        formData.append("contentJson", JSON.stringify(values.contentJson || {}));

        const tagsArray = typeof values.tags === 'string'
            ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            : values.tags.filter(tag => tag.trim() !== '');
        formData.append("tags", JSON.stringify(tagsArray));
        formData.append("displayImageAlt", values.imageAlt || "");
        formData.append("visibility", values.postVisibility);
        formData.append("featured", String(values.featured || false));

        if (values.displayImage) {
            formData.append("displayImage", values.displayImage);
        }

        // If in edit mode, i might need to send the ID (depends on backend, but good to have)
        if (id) {
            formData.append("id", id);
        }

        return formData;
    };

    const handleSaveDraft = async (values: BlogPostFormValues, shouldRedirect = false) => {
        // Only save if there's actual content in the editor
        if (!editor || editor.getText().trim() === "") return;

        setIsSaving(true);
        try {
            const formData = prepareFormData(values);
            await saveDraft(formData);
            setLastSaved(new Date());

            if (shouldRedirect) {
                enqueueSnackbar("Draft saved successfully", { variant: "success" });
                setTimeout(() => navigate("/blog"), 1000);
            }
        } catch (error) {
            console.error("Error saving draft:", error);
        } finally {
            setTimeout(() => setIsSaving(false), 500);
        }
    }

    const handleSubmit = async (values: BlogPostFormValues) => {
        try {
            if (!values.displayImage && type === "create") {
                enqueueSnackbar("Please upload a display image", { variant: "error" });
                return;
            }

            if (!values.contentHtml || values.contentHtml.trim() === "" || values.contentHtml === "<p></p>") {
                enqueueSnackbar("Please add some content to your post", { variant: "error" });
                return;
            }

            const formData = prepareFormData(values);
            const response = await createBlogPost(formData);

            enqueueSnackbar(response.message || `Blog post ${type === 'create' ? 'created' : 'updated'} successfully!`, { variant: "success" });

            setTimeout(() => {
                navigate("/blog");
            }, 1500);

        } catch (error: any) {
            console.error("Error submitting blog post:", error);
            enqueueSnackbar(
                error?.response?.data?.message || `Failed to ${type === 'create' ? 'create' : 'update'} blog post`,
                { variant: "error" }
            );
        }
    }

    if (isLoadingPost && type === "edit") {
        return <BlogFormSkeleton />;
    }

    return (
        <div className="mt-4 flex flex-col gap-6">
            <div className="flex items-center mb-2">
                <button
                    type="button"
                    onClick={() => navigate("/blog")}
                    className="btn-back"
                >
                    <ArrowLeft2 size={18} color="#898483" />
                    <span className="ml-3 hidden lg:inline-block"> Back</span>
                </button>
            </div>

            <Formik
                initialValues={formInitialValues}
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
                }: any) => {
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

                    return (
                        <Form className="md:mx-5">
                            <div className="bg-white rounded-[.75rem] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-2xl font-bold text-[#3E3E3E] font-coolvetica">
                                        {type !== "create" ? "Edit Your Post" : "Create Your Post"}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <p className="text-xs text-gray-400 font-montserrat">
                                            Modified last on {lastSaved ? lastSaved.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Today"}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span style={{ backgroundColor: bgColor, color: labelColor }} className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                                                <span style={{ backgroundColor: dotColor }} className="w-1.5 h-1.5 rounded-full"></span>
                                                {label}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 mr-2">
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin text-aciu-green-normal" />
                                                <span className="text-sm font-semibold text-aciu-green-normal font-montserrat transition-all">Saving...</span>
                                            </>
                                        ) : lastSaved ? (
                                            <>
                                                <CheckIcon size={16} className="text-aciu-green-normal" />
                                                <span className="text-sm font-semibold text-aciu-green-normal font-montserrat transition-all">Saved</span>
                                            </>
                                        ) : null}
                                    </div>
                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => handleSaveDraft(values, true)}
                                        className="h-11 px-6 rounded-lg border border-gray-200 text-[#3E3E3E] font-semibold font-montserrat hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isPublishing}
                                        className="h-11 px-6 rounded-lg bg-aciu-green-normal text-white font-semibold font-montserrat hover:bg-aciu-green-dark transition-colors flex items-center gap-2"
                                    >
                                        {isPublishing && <Loader2 size={18} className="animate-spin" />}
                                        {isPublishing ? (type === 'create' ? "Publishing..." : "Updating...") : (type === 'create' ? "Publish Post" : "Update Post")}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-6 items-start">
                                <div className="rounded-[.625rem] bg-white min-h-screen self-start flex flex-col">
                                    <EditorMenuBar editor={editor} />
                                    <div className="flex-1 w-full overflow-y-auto min-h-[500px] px-8 py-6">
                                        <EditorContent
                                            editor={editor}
                                            className="font-montserrat outline-none prose prose-lg max-w-none prose-headings:font-bold prose-p:text-[#3E3E3E]"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 sticky top-4">
                                    <div className="rounded-[.75rem] border border-gray-200 bg-white p-5 flex flex-col gap-6 shadow-sm">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontFamily: '"Montserrat", sans-serif',
                                                            fontSize: ".75rem",
                                                            color: "#3E3E3E",
                                                        }}
                                                    >
                                                        Post Title <span className="text-aciu-green-normal">*</span>
                                                    </FormLabel>
                                                    <span className="text-[10px] text-gray-400 font-montserrat">
                                                        {values.title.length}/100
                                                    </span>
                                                </div>
                                                <input
                                                    name="title"
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    maxLength={100}
                                                    placeholder="Enter your post title"
                                                    className="border border-gray-200 rounded-[.625rem] py-3 px-4 focus:border-aciu-green-normal focus:ring-1 focus:ring-aciu-green-normal outline-none text-sm font-montserrat placeholder:text-gray-400"
                                                />
                                                {touched.title && errors.title && (
                                                    <span className="text-red-500 text-[10px]">{errors.title as any}</span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontFamily: '"Montserrat", sans-serif',
                                                            fontSize: ".75rem",
                                                            color: "#3E3E3E",
                                                        }}
                                                    >
                                                        Post Description <span className="text-aciu-green-normal">*</span>
                                                    </FormLabel>
                                                    <span className="text-[10px] text-gray-400 font-montserrat">
                                                        {values.description.length}/500
                                                    </span>
                                                </div>
                                                <textarea
                                                    name="description"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    maxLength={500}
                                                    placeholder="Write a short description for your post"
                                                    className="border border-gray-200 rounded-[.625rem] py-3 px-4 focus:border-aciu-green-normal focus:ring-1 focus:ring-aciu-green-normal outline-none text-sm font-montserrat placeholder:text-gray-400 min-h-[120px] resize-none"
                                                />
                                                {touched.description && errors.description && (
                                                    <span className="text-red-500 text-[10px]">{errors.description as any}</span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <FormLabel
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: '"Montserrat", sans-serif',
                                                        fontSize: ".75rem",
                                                        color: "#3E3E3E",
                                                    }}
                                                >
                                                    Post Tags <span className="text-aciu-green-normal">*</span>
                                                </FormLabel>
                                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-[.625rem] min-h-[44px]">
                                                    {(typeof values.tags === 'string' ? values.tags.split(',').filter((t: any) => t.trim()) : values.tags).map((tag: any, index: any) => (
                                                        <span key={index} className="bg-aciu-cyan-light text-aciu-green-normal text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1.5">
                                                            {tag}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const currentTags = typeof values.tags === 'string' ? values.tags.split(',').filter((t: any) => t.trim()) : values.tags;
                                                                    setFieldValue("tags", currentTags.filter((_: any, i: any) => i !== index));
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                    <input
                                                        placeholder="Press 'return' to add tag"
                                                        className="outline-none text-sm font-montserrat flex-1 min-w-[120px] placeholder:text-gray-400"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                const val = (e.target as HTMLInputElement).value.trim();
                                                                if (val) {
                                                                    const currentTags = typeof values.tags === 'string' ? values.tags.split(',').filter((t: any) => t.trim()) : values.tags;
                                                                    if (!currentTags.includes(val)) {
                                                                        setFieldValue("tags", [...currentTags, val]);
                                                                    }
                                                                    (e.target as HTMLInputElement).value = '';
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-aciu-abriba font-montserrat">Press "return" to add tag</p>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <FormLabel
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: '"Montserrat", sans-serif',
                                                        fontSize: ".75rem",
                                                        color: "#3E3E3E"
                                                    }}>
                                                    Display Image <span className="text-aciu-green-normal">*</span>
                                                </FormLabel>
                                                <div className="cursor-pointer" onClick={() => inputRef.current?.click()}>
                                                    {!imagePreview ? (
                                                        <div className="border border-dashed border-aciu-green-normal rounded-[12px] h-[160px] bg-aciu-cyan-light flex flex-col items-center justify-center gap-2">
                                                            <CloudIcon />
                                                            <p className="text-center text-[#3E3E3E] font-montserrat font-medium text-xs px-4">
                                                                Drag & drop or <span className="text-aciu-green-normal">click to choose file</span>
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-3">
                                                            <img src={imagePreview} alt="Cover Preview" className="w-full h-[180px] object-cover rounded-xl" />
                                                            <p className="text-aciu-green-normal font-semibold text-xs hover:underline decoration-2 underline-offset-4 cursor-pointer">
                                                                Edit Cover Image
                                                            </p>
                                                        </div>
                                                    )}
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
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <FormLabel
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: '"Montserrat", sans-serif',
                                                        fontSize: "11px",
                                                        color: "#1E293B"
                                                    }}>
                                                    Image Alt Text
                                                </FormLabel>
                                                <input
                                                    name="imageAlt"
                                                    value={values.imageAlt}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Describe the image above"
                                                    className="border border-gray-200 rounded-[.625rem] py-3 px-4 focus:border-aciu-green-normal focus:ring-1 focus:ring-aciu-green-normal outline-none text-sm font-montserrat placeholder:text-gray-400"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <FormLabel
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontFamily: '"Montserrat", sans-serif',
                                                        fontSize: "12px",
                                                        color: "#3E3E3E"
                                                    }}>
                                                    Set Post Visibility <span className="text-aciu-green-normal">*</span>
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

                                            <div className="flex items-center justify-between py-1">
                                                <span className="text-sm font-semibold font-montserrat text-[#3E3E3E]">
                                                    Set as featured post
                                                </span>
                                                <Switch
                                                    name="featured"
                                                    checked={values.featured}
                                                    onChange={(e) => setFieldValue("featured", e.target.checked)}
                                                    sx={{
                                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                                            color: '#00B087',
                                                            '& + .MuiSwitch-track': {
                                                                backgroundColor: '#00B087',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}