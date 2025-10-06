import { publicationStatusMap } from "@/utils/helpers";
import { Form, Formik } from "formik";
import { CheckIcon } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react'
import { FormLabel } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading';
import { TextStyleKit } from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import FormikField from "@/components/FormikField";
import EditorMenuBar from "./EditorMenuBar";
import { useEffect, useRef } from "react";
import { CloudIcon } from "@/components/Icons";
import type { BlogPostFormValues } from "@/utils/types";
import { fields } from "@/utils/data";

const extensions = [
    TextStyleKit, 
    StarterKit, 
    Image, 
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph']
    }),
    Heading.configure({
        levels: [1, 2, 3, 4, 5, 6]
    })
]

export default function BlogPostForm({ type="create" }: { type: "create" | "edit"}) {
    const inputRef = useRef<HTMLInputElement | null>(null);

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
    

    const initialValues: BlogPostFormValues = {
        title: "",
        description: "",
        content: "",
        tags: [""],
        displayImage: "",
        imageAlt: "",
        postVisibility: "public",
        status: "draft"
    }

    const handleSubmit = async (values: any, actions: any) => {
        console.log(values, actions);
        console.log(type);
    }

    
    return (
        <div className="mt-4 flex flex-col gap-[.875rem]">
            <div 
                className="p-4 flex flex-col gap-6 
                md:items-center md:flex-row md:justify-between md:gap-0 
                bg-white md:mx-5 rounded-lg"
            >
                <div className="flex flex-col gap-2">
                    {/* Add conditional for create and edit */}
                    <h3 className="font-bold font-montserrat text-aciu-border-grey text-xl">
                        {type !== "create" ? "Edit Post" : "Create New Post"}
                    </h3>
                    <div className="flex items-center gap-2">
                        {/* {type === "edit" && 
                            <> */}
                                <p className="text-sm font-montserrat font-medium text-aciu-abriba">
                                    Modified last on March 6, 2025
                             </p>
                       {/* <Dot size={20} color="#C9C9C9" className="text-[#C9C9C9]"/> */}
                        {/* <DotIcon size={20} color="#C9C9C9" /> */}
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
                    <p className="md:flex items-center gap-1 hidden">
                        <span 
                            className="w-4 h-4 bg-aciu-green-normal 
                            flex items-center justify-center rounded-full"
                        >
                            <CheckIcon size={10} color="white"/>
                        </span>
                        <span className="font-montserrat text-sm font-semibold text-aciu-border-grey">
                            Saved
                        </span>
                    </p>
                    <button className="font-coolvetica p-4 h-[56px] 
                        rounded-[.75rem] border border-aciu-dashboard-background 
                        text-aciu-border-grey shadow-[0px_1px_2px_0px_#0D0D120A]"
                    >
                        Save as Draft
                    </button>
                    <button className="font-coolvetica p-4 h-[56px] 
                        rounded-[.75rem] bg-aciu-green-normal text-white"
                    >
                        Publish Post
                    </button>
                </div>
            </div>


            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                }) => {
                    useEffect(() => {
                        if (!editor) return;

                        const handleUpdate = () => {
                            setFieldValue("content", editor.getHTML());
                        }

                        editor.on("update", handleUpdate);

                        return () => {
                            editor.off("update", handleUpdate);
                        }
                    }, [editor]);

                    useEffect(() => {
                        if (!editor) return;
                        const currentContent = editor.getHTML();
                        if (values.content !== currentContent) {
                            editor.commands.setContent(values.content || "");
                        }
                    }, [values.content]);

                    return (
                        <Form className="md:mx-5 grid grid-cols-1 md:grid-cols-[3fr_1.5fr] gap-5 items-center py-4 px-3">
                            <div className="rounded-[.625rem] bg-white min-h-screen self-start flex flex-col">
                                <EditorMenuBar editor={editor} />
                                <EditorContent 
                                    editor={editor} 
                                    className="font-montserrat flex-1 w-full overflow-auto 
                                    outline-none focus:outline-none focus-visible:!outline-none"
                                />
                            </div>


                            <div className="rounded-[.625rem] bg-white px-3 py-4">
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
                                                    {errors[field.name as keyof typeof errors]}
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
                                            {!values.displayImage ?
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
                                                            src={values.displayImage}
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
                                            onChange={(e) => setFieldValue("displayImage", e.target.files?.[0] || null)}
                                        />
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
                                                { value: "public", label: "Public" }, 
                                                { value: "private", label: "Private"}
                                            ]}
                                            fullWidth
                                        />
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