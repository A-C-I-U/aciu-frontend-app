import { UploadFileImage } from "@/components/Icons"
import { ScrollLock } from "@/components/ScrollLock"
import ShellHeader from "@/components/ShellHeader"
import type { DialogFuncProps } from "@/utils/types"
import { Dialog, Divider } from "@mui/material"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"
import { ImageUploaded } from "./ImageUploaded"

const dialogSx = {
    "& .MuiDialog-paper": {
        overflow: "hidden",
        width: { xs: "92%", md: "38.25rem" },
        maxHeight: "95%",
        margin: "0 auto",
        borderRadius: "1.25rem",
    },
}

const initialValues = {
    images: [] as File[]
}

export default function UploadPhoto({
    open, onClose
}: DialogFuncProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uploads, setUploads] = useState<{ id: string; image: File; progress: number }[]>([]);

    const simulateUpload = (image: File) => {
        const id = `${image.name}-${image.lastModified}`;

        setUploads((prev) => [...prev, { id, image, progress: 0 }]);

        const interval = setInterval(() => {
            setUploads((prev) =>
                prev.map((u) =>
                    u.id === id
                    ? {
                        ...u,
                        progress: u.progress >= 100 ? 100 : u.progress + 10,
                    }
                    : u
                )
            );
        }, 300);
            setTimeout(() => clearInterval(interval), 300 * 11);
        };

    const handleSubmit = (_values: any, _actions: any) => {}

    
    return (
        <>
            <ScrollLock open={open} />
            <Dialog
                open={open}
                onClose={onClose}
                sx={dialogSx}
            >
                <div className="resources-modal-section">
                    <ShellHeader title="Upload Media" onClose={onClose} />
                    <Divider className="flex shrink-0" />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, isSubmitting, isValid }) => {

                            const handleDeleteImage = (index: number) => {
                                const newImages = values.images.filter((_, i) => i !== index);
                                setFieldValue("images", newImages);
                                setUploads((prev) => prev.filter((_, i) => i !== index));
                            };


                            return (
                                <Form className="flex flex-col h-4/5 md:h-full overflow-hidden">
                                    <div className="resources-modal-body mb-10">
                                        <div 
                                            className="cursor-pointer"
                                            onClick={() => inputRef.current?.click()}
                                        >
                                            <div className="gap-2 flex flex-col w-full">
                                                <UploadFileImage width="100%" height="auto" />
                                                <div className="flex justify-between items-center">
                                                    <p className="font-montserrat text-grayscale-100 text-sm">
                                                        Supported formats: png, jpg, jpeg
                                                    </p>
                                                    <p className="font-montserrat text-grayscale-100 text-sm">
                                                        Max: 10mb
                                                    </p>
                                                </div>
                                            </div>
                                            <input 
                                                ref={inputRef}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    const validFiles = files.filter(
                                                        (file) =>
                                                            ["image/png", "image/jpeg", "image/jpg"].includes(file.type) &&
                                                            file.size <= 10 * 1024 * 1024
                                                    );
                                                    validFiles.forEach((file) => simulateUpload(file));
                                                    setFieldValue("images", [...values.images, ...validFiles]);
                                                }}
                                            />
                                        </div>
                                        {uploads.length > 0 &&
                                            <div className="flex flex-col gap-2 overflow-y-auto max-h-50">
                                                <p className="font-semibold leading-[100%] text-aciu-border-grey">
                                                    Upload Document
                                                </p>
                                                {uploads.map((upload, index) => (
                                                    <ImageUploaded
                                                        key={index}
                                                        image={upload.image}
                                                        onDelete={() => handleDeleteImage(index)}
                                                        progress={upload.progress}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="py-5.5 px-10.5 resource-buttons-container items-start">
                                        <button 
                                            className="btn btn-primary"
                                            disabled={isSubmitting || !isValid}
                                            type="submit"
                                        >
                                            Upload Media
                                        </button>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={onClose}
                                            type="button"
                                        >
                                            Cancel Upload
                                        </button>
                                    </div>
                                </ Form>
                            )
                        }}
                    </Formik>
                </div>
            </Dialog>
        </>
    )
}