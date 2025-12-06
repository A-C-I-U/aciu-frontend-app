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
        height: "auto",
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
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prev) => {
            if (prev >= 100) {
                clearInterval(interval);
                setIsUploading(false);
                return 100;
            }
                return prev + 10;
            });
        }, 300);
    };

    const handleSubmit = (_values: any, _actions: any) => {
        
    }

    
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
                        {({ values, setFieldValue }) => {

                            const handleDeleteImage = (values: any, index: number) => {
                                const newImages = values.images.filter((_: any, i: number) => i !== index);
                                setFieldValue("images", newImages);
                            }

                            return (
                                <Form className="flex flex-col h-4/5 md:h-full overflow-hidden">
                                    <div className="resources-modal-body">
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
                                                    if (files.length > 0) {
                                                        simulateUpload();
                                                    }
                                                    setFieldValue("images", [...values.images, ...validFiles]);
                                                }}
                                            />
                                        </div>
                                        {values.images &&
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold leading-[100%] text-aciu-border-grey">
                                                    Upload Document
                                                </p>
                                                {values.images.map((file, index) => (
                                                    <ImageUploaded
                                                        key={index}
                                                        image={file}
                                                        onDelete={() => handleDeleteImage(values, index)}
                                                        loading={isUploading}
                                                        progress={uploadProgress}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="py-5.5 px-10.5 resource-buttons-container items-start">
                                        <button 
                                            className="btn btn-primary"
                                        >
                                            Upload Media
                                        </button>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={onClose}
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