import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import UploadPhoto from "./UploadPhoto";
import ViewPhoto from "./ViewPhoto";
import { galleryImages } from "@/utils/data";

// Keeping `Img` interface here in case of change
export interface Img {
    name: string,
    url: string,
    category: string
}


const sectionActions = [
    <button className="section-action-button">
        Filter
    </button>,
    <button className="section-action-button">
        2022
    </button>
]


export default function BranchGalleryTab() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [selected, setSelected] = useState<Img | null>(null);
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    const handleViewClick = (photo: any) => {
        setSelected(photo);
        setIsViewOpen(true);
    }

    return (
        <>
            <div className="flex flex-col gap-6 px-4">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} flex-wrap gap-y-2 md:gap-4`}>
                    <SectionHeader
                        title={!isMedium ? "Branch Gallery" : ""}
                        onSearch={handleSearch}
                        showSearch={false}
                        actions={sectionActions}
                        noTitle={!isMedium ? false : true}
                    />
                    <button 
                        className="text-sm md:text-base py-3 px-2 md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
                        onClick={() => setShowUploadPhoto(true)}
                    >
                    Upload Photo
                    </button>
                </div>
                <div className="grid gap-x-3.5 gap-y-4 md:grid-cols-2 md:max-w-150 lg:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:max-w-full overflow-y-auto no-scrollbar">
                    {galleryImages.map((image, index) => (
                        <img 
                            title="Click on the image to view"
                            key={index}
                            src={image.url} 
                            alt={`${image.category} image`} 
                            className="w-full h-51.5 cursor-pointer object-cover"
                            onClick={() => handleViewClick(image)}
                        />
                    ))}
                </div>
            </div>
            <UploadPhoto
                open={showUploadPhoto}
                onClose={() => setShowUploadPhoto(false)}
            />

            <ViewPhoto
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                image={selected}
            />
        </>
    )
}