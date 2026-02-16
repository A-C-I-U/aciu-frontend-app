import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import ViewPhoto from "./ViewPhoto";
import { sectionActions } from "@/components/SectionActions";
import { useGallery } from "@/services/hooks/gallery";
import { GalleryCategory, type GalleryItem } from "@/services/types/gallery";
import { GallerySkeleton } from "@/components/GallerySkeleton";



export default function BranchGalleryTab() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [category, _setCategory] = useState<GalleryCategory>(GalleryCategory.NATIONAL_EVENTS);

    const { data: images, isLoading } = useGallery(category);

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    const handleViewClick = (photo: GalleryItem) => {
        setSelected(photo);
        setIsViewOpen(true);
    }

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

            <ViewPhoto
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                image={selected}
            />
        </>
    )
}