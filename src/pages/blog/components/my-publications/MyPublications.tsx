import { useState } from "react";
import { ArrowDown2, Sort } from "iconsax-react";
import { Link } from "react-router-dom";
import PublicationsTable from "./table";
import SectionHeader from "@/components/SectionHeader";

const sectionActions = [
    <button
        key="filter"
        className="flex gap-2.5 items-center p-2.5 
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-12.5
        border border-aciu-card-grey"
    >
        Filter
        <Sort variant="Outline" color="#A4ACB9" size={20} />
    </button>,
    <button
        key="year"
        className="flex gap-2.5 items-center p-2.5
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-12.5
        border border-aciu-card-grey"
    >
        2022
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>,
]

export default function MyPublications() {
    const [ _query, setQuery ] = useState("");
        
    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
         <div className="flex flex-col gap-6 lg:gap-4">
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-start lg:gap-4 lg:items-center w-full">
                    <SectionHeader
                        title="My Publications"
                        onSearch={handleSearch}
                        showSearch
                        actions={sectionActions}
                    />
                    <Link
                        to="/blog/create"
                        style={{
                            padding: "1rem",
                            gap: ".5rem",
                            borderRadius: ".75rem",
                            backgroundColor: "#00B686",
                            color: "#fff",
                            fontFamily: "'Coolvetica', sans-serif",
                            width: "100%",
                            maxWidth: "fit-content"
                        }}
                        >
                            Publish new post
                    </Link>
                </div>    
            </div>
            <PublicationsTable />
        </div>
    )
}