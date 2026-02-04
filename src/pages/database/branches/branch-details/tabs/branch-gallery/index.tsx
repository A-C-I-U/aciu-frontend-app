import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import ViewPhoto from "./ViewPhoto";
import { galleryImages } from "@/utils/data";
import { sectionActions } from "@/components/SectionActions";

// Keeping `Img` interface here in case of change
export interface Img {
    name: string,
    url: string,
    category: string
}



export default function BranchGalleryTab() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [selected, setSelected] = useState<Img | null>(null);
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
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title={!isLarge ? "Branch Gallery" : ""}
                        onSearch={handleSearch}
                        showSearch={false}
                        actions={sectionActions}
                        noTitle={!isLarge ? false : true}
                    />
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

            <ViewPhoto
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                image={selected}
            />
        </>
    )
}