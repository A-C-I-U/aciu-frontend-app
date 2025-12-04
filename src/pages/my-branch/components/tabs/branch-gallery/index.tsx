import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

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
    const [_showUploadPhoto, setShowUploadPhoto] = useState(false);

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Branch Gallery"
                    onSearch={handleSearch}
                    showSearch={false}
                    actions={sectionActions}
                />
                <button 
                    className="text-sm md:text-base py-3 px-2 md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
                    onClick={() => setShowUploadPhoto(true)}
                >
                   Upload Photo
                </button>
            </div>
        </div>
    )
}