import { useState } from "react";
import { ArrowDown2, Sort } from "iconsax-react";
import { Link } from "react-router-dom";
import PublicationsTable from "./PublicationsTable";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";

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

import { useMyPublications } from "@/services/hooks/blogs";
import { Skeleton, Alert } from "@mui/material";

export default function MyPublications() {
    const [query, setQuery] = useState("");
    const isMedium = useMediaQuery('(max-width:1250px)')

    const { data: publicationsData, isLoading, error } = useMyPublications();
    const publications = publicationsData?.posts || [];

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    const filteredPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6 lg:gap-4">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap gap-4 justify-between items-start lg:flex-nowrap lg:items-center w-full">
                    <div className="min-w-fit lg:w-full">
                        <SectionHeader
                            title="My Publications"
                            onSearch={handleSearch}
                            showSearch={isMedium ? false : true}
                            actions={sectionActions}
                        />
                    </div>
                    <Link
                        to="/blog/create"
                        className="py-3 px-2 lg:py-4 lg:px-4 gap-2
                            rounded-xl bg-aciu-green-normal whitespace-nowrap min-w-fit
                            text-white font-coolvetica w-full max-w-fit"
                    >
                        Publish new post
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={60} className="rounded-lg" />
                    ))}
                </div>
            ) : error ? (
                <Alert severity="error">
                    Failed to load publications. Please try again later.
                </Alert>
            ) : (
                <PublicationsTable data={filteredPublications} />
            )}
        </div>
    )
}