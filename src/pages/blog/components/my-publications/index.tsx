import { useState } from "react";
import { Link } from "react-router-dom";
import PublicationsTable from "./PublicationsTable";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";

import { useMyPublications } from "@/services/hooks/blogs";
import { Alert } from "@mui/material";
import TableSkeleton from "@/components/TableSkeleton";
import { sectionActions } from "@/components/SectionActions";

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
                <TableSkeleton />
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