import { dummyResources } from "@/utils/data";
import { Sort } from "iconsax-react";
import { useState } from "react";
import FileView from "../components/FileView";
import EmptyState from "../components/EmptyState";
import UploadResource from "../components/UploadResource";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";

export default function MeetingReportsPage() {
    const [ query, setQuery ] = useState("");
    const [openUpload, setOpenUpload] = useState(false);
    const isMedium = useMediaQuery("(max-width:1250px")
            
    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex gap-4 items-center w-full">
                <SectionHeader
                    title="Union Reports & Congress Documents"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={[
                        <button className="section-action-button">
                            Filter
                            <Sort variant="Outline" color="#A4ACB9" size={20} />
                        </button>
                    ]}
                />
                <button
                    className="btn btn-primary max-w-fit"
                    onClick={() => setOpenUpload(true)}
                >
                    Upload Resource
                </button>    
            </div>
            {dummyResources ?
                <div className="resource-grid"
                >
                    {dummyResources.map((resource, index) => (
                        <FileView key={index} {...resource} />
                    ))}
                </div> : 
                <EmptyState prompt={query || "Union Reports and Congress Documents"}/>
            }
            <UploadResource open={openUpload} onClose={() => setOpenUpload(false)} />
        </div>
                    
    )
}