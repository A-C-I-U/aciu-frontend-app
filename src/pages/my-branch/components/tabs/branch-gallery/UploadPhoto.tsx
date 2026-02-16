import { UploadFileImage, UploadImageShortMobile } from "@/components/Icons"
import { ScrollLock } from "@/components/ScrollLock"
import ShellHeader from "@/components/ShellHeader"
import type { DialogFuncProps } from "@/utils/types"
import { Dialog, Divider, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"
import { ImageUploaded } from "./ImageUploaded"
import { useUploadGallery } from "@/services/mutations/gallery"
import { GalleryCategory } from "@/services/types/gallery"

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
    images: [] as File[],
    category: GalleryCategory.BRANCH_MEETINGS
}

export default function UploadPhoto({
    open, onClose
}: DialogFuncProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uploads, setUploads] = useState<{ id: string; image: File; progress: number }[]>([]);
    const { mutate: uploadImages, isPending } = useUploadGallery();

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
        }, 100);
        setTimeout(() => clearInterval(interval), 100 * 11);
    };

    const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
        if (values.images.length === 0) return;

        uploadImages(values.images, {
            onSuccess: () => {
                resetForm();
                setUploads([]);
                onClose();
            }
        });
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
                        {({ values, setFieldValue, isValid }) => {

                            const handleDeleteImage = (index: number) => {
                                const newImages = values.images.filter((_, i) => i !== index);
                                setFieldValue("images", newImages);
                                setUploads((prev) => prev.filter((_, i) => i !== index));
                            };


                            return (
                                <Form className="flex flex-col h-4/5 md:h-full overflow-hidden">
                                    <div className="resources-modal-body mb-5 overflow-y-auto no-scrollbar">
                                        <div className="mb-6">
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="category-label">Category</InputLabel>
                                                <Select
                                                    labelId="category-label"
                                                    value={values.category}
                                                    label="Category"
                                                    onChange={(e) => setFieldValue("category", e.target.value)}
                                                    sx={{ borderRadius: "0.5rem" }}
                                                >
                                                    <MenuItem value={GalleryCategory.NATIONAL_EVENTS}>National Events</MenuItem>
                                                    <MenuItem value={GalleryCategory.BRANCH_MEETINGS}>Branch Meetings</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>

                                        <div
                                            className="cursor-pointer"
                                            onClick={() => inputRef.current?.click()}
                                        >
                                            <div className="gap-2 flex flex-col w-full">
                                                <div className="md:block hidden">
                                                    <UploadFileImage width="100%" className="h-auto" />
                                                </div>

                                                <div className="md:hidden block">
                                                    <UploadImageShortMobile width="100%" className="h-auto" />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-montserrat text-grayscale-100 text-xs md:text-sm">
                                                        Supported formats: png, jpg, jpeg
                                                    </p>
                                                    <p className="font-montserrat text-grayscale-100 text-xs md:text-sm">
                                                        Max: 10mb
                                                    </p>
                                                </div>
                                            </div>
                                            <input
                                                ref={inputRef}
                                                style={{ display: 'none' }}
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
                                            <div className="flex flex-col gap-2 mt-6 overflow-y-auto max-h-50">
                                                <p className="font-semibold leading-[100%] text-aciu-border-grey">
                                                    Selected Photos ({uploads.length})
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
                                            className="btn btn-primary flex items-center justify-center gap-2"
                                            disabled={isPending || !isValid || values.images.length === 0}
                                            type="submit"
                                        >
                                            {isPending ? <CircularProgress size={20} color="inherit" /> : "Upload Media"}
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