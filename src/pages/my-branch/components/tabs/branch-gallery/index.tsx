import SectionHeader from "@/components/SectionHeader";
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

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <div className="flex flex-col gap-6 px-4">
            <SectionHeader
                title="Branch Gallery"
                onSearch={handleSearch}
                showSearch={false}
                actions={sectionActions}
            />
        </div>
    )
}