import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import UploadPhoto from "./UploadPhoto";
import ViewPhoto from "./ViewPhoto";
import { useGallery } from "@/services/hooks/gallery";
import { GallerySkeleton } from "@/components/GallerySkeleton";
import { GalleryCategory, type GalleryItem } from "@/services/types/gallery";
import { Menu, MenuItem } from "@mui/material";


export default function BranchGalleryTab() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [category, setCategory] = useState<GalleryCategory>(GalleryCategory.NATIONAL_EVENTS);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { data: images, isLoading } = useGallery(category);

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    const handleViewClick = (photo: GalleryItem) => {
        setSelected(photo);
        setIsViewOpen(true);
    }

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = (selectedCategory?: GalleryCategory) => {
        if (selectedCategory) {
            setCategory(selectedCategory);
        }
        setAnchorEl(null);
    };

    const sectionActions = [
        <div key="filter-wrapper">
            <button
                className="section-action-button"
                onClick={handleFilterClick}
            >
                {category}
            </button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleFilterClose()}
            >
                <MenuItem onClick={() => handleFilterClose(GalleryCategory.NATIONAL_EVENTS)}>
                    National Events
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose(GalleryCategory.BRANCH_MEETINGS)}>
                    Branch Meetings
                </MenuItem>
            </Menu>
        </div>,
        <button key="year-filter" className="section-action-button">
            2022
        </button>
    ]

    return (
        <>
            <div className="flex flex-col gap-6 px-4">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title={!isLarge ? "Branch Gallery" : ""}
                        onSearch={handleSearch}
                        showSearch={false}
                        actions={sectionActions}
                        noTitle={!isLarge ? false : true}
                    />
                    <button
                        className="text-sm md:text-base py-3 px-2 md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
                        onClick={() => setShowUploadPhoto(true)}
                    >
                        Upload Photo
                    </button>
                </div>

                {isLoading ? (
                    <GallerySkeleton />
                ) : (
                    <div className="grid gap-x-3.5 gap-y-4 md:grid-cols-2 md:max-w-150 lg:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:max-w-full overflow-y-auto no-scrollbar">
                        {images?.length === 0 && (
                            <p className="text-center col-span-full py-10 text-grayscale-100">
                                No images found for this category.
                            </p>
                        )}
                        {images?.map((image) => (
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
            <UploadPhoto
                open={showUploadPhoto}
                onClose={() => setShowUploadPhoto(false)}
            />

            <ViewPhoto
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                image={selected}
                onDeleted={() => {
                    setSelected(null);
                    setIsViewOpen(false);
                }}
            />
        </>
    )
}