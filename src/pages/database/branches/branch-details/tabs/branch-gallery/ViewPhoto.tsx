import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import type { GalleryItem } from "@/services/types/gallery";
import { useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { TrashIcon } from "@/components/Icons";
import { useDeleteGallery } from "@/services/mutations/gallery";



export default function ViewPhoto({
    open, onClose, image
}: DialogFuncProps & { image: GalleryItem | null }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { mutate: deleteImage, isPending } = useDeleteGallery();

    if (!image) return null;

    const { fileName, fileUrl, category, id } = image;

    const handleDelete = () => {
        deleteImage(id, {
            onSuccess: () => {
                setShowConfirm(false);
                onClose();
            }
        });
    }

    return (
        <>
            <ShellModal
                open={open}
                onClose={onClose}
            >
                <div className="resources-modal-section">
                    <ShellHeader title="View Image" onClose={onClose} />
                    <div className="flex flex-col h-full overflow-hidden">
                        <img src={fileUrl} alt="Image Preview" className="w-full object-cover h-auto min-h-90 px-5.5 md:max-h-75.75" />
                        <div className="resources-modal-body">
                            <Divider className="flex shrink-0" />
                            <div className="flex flex-col gap-3.75">
                                <DisabledInput
                                    label="File Name"
                                    value={fileName}
                                />
                                <DisabledInput
                                    label="Category"
                                    value={category}
                                />
                            </div>
                        </div>
                        <div className="py-5.5 px-10.5 resource-buttons-container">
                            <button
                                className="btn btn-danger-outline flex items-center justify-center gap-2"
                                onClick={() => setShowConfirm(true)}
                                disabled={isPending}
                            >
                                Delete Upload
                            </button>
                        </div>
                    </div>
                </div>
            </ShellModal>

            <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                title="Delete image"
                message="Are you sure you want to delete this image? action cannot be undone"
                icon={<TrashIcon />}
                confirmAction={{
                    label: "Delete",
                    onClick: handleDelete,
                    isPending: isPending
                }}
                cancelAction={{
                    label: "Cancel",
                    onClick: () => setShowConfirm(false)
                }}
            />
        </>
    )
}

export const DisabledInput = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-col gap-2 items-start w-full">
            <label className="text-sm font-medium text-aciu-border-grey">
                {label}
            </label>
            <input
                type="text"
                value={value}
                className="pointer-events-none text-sm font-medium text-aciu-abriba leading-[100%] py-4 px-3 border border-aciu-card-grey rounded-2xs w-full bg-aciu-bg-grey"
                readOnly
            />
        </div>
    )
}