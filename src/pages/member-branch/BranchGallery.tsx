import { useState } from "react"
import { cx } from "class-variance-authority"
import type { GalleryItem } from "@/services/types/gallery";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import { GallerySkeleton } from "@/components/GallerySkeleton";
import { useGallery } from "@/services/hooks/gallery";
import { EmptyPage } from "@/components/EmptyPage";

const filterGroups = [
  { key: "", label: "All Photos" },
  { key: "Branch Meetings", label: "Branch Meetings" },
  { key: "National Events", label: "National Events" },
]

export default function BranchGallery() {
    const [filterParam, setFilterParam] = useState(filterGroups[0].key)
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const { data: images, isLoading } = useGallery(filterParam)

    const handleViewClick = (photo: GalleryItem) => {
        setSelected(photo);
        setIsViewOpen(true);
    }

  return (
    <>
        <div className="lg:px-4.5 lg:py-6 flex flex-col gap-6 w-full">
            <div className="flex justify-between">
                <div className="flex gap-4.5">
                    {filterGroups.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setFilterParam(key)}
                            className={cx(
                                "rounded-xl shadow-[0px_1px_3px_0px_#0D0D120D] p-4 tracking-[5%] text-sm font-coolvetica active:scale-[.9] transition-all duration-200",
                                filterParam === key
                                ? "bg-aciu-green-normal text-white"
                                : "border border-aciu-green-normal text-aciu-green-normal"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            {isLoading ? (
                <GallerySkeleton />
            ) : (
                <div className="grid gap-x-3.5 gap-y-4 md:grid-cols-2 md:max-w-150 lg:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:max-w-full overflow-y-auto no-scrollbar">
                    {images?.length === 0 && (
                        <EmptyPage label="No images found for this category." />
                    )}
                    {images?.map((image: GalleryItem) => (
                        <img
                            title="Click on the image to view"
                            key={image.id}
                            src={image.fileUrl}
                            alt={`${image.category} image`}
                            className="w-full h-51.5 cursor-pointer object-cover rounded-lg"
                            onClick={() => handleViewClick(image)}
                        />
                    ))}
                </div>
            )}
        </div>
        <ViewPhoto
            open={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            image={selected}
        />
    </>
  )
}





function ViewPhoto({
    open, onClose, image,
}: DialogFuncProps & { image: GalleryItem | null }) {

    if (!image) return null;

    const { fileName, fileUrl, category } = image;

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
                    </div>
                </div>
            </ShellModal>
        </>
    )
}

const DisabledInput = ({ label, value }: { label: string, value: string }) => {
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