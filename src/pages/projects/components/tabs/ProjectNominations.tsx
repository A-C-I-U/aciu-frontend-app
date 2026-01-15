import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import { useNominatedProjects } from "@/services/hooks/project"
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { EmptyPage } from "@/components/EmptyPage";
import ErrorState from "@/components/ErrorState";
import { columns } from "../table/ProjectNomColumns";
import ProjectNominationsTable from "../table/ProjectNomTable";
import TableSkeleton from "@/components/TableSkeleton";
import MobileItemSkeleton from "@/components/MobileItemSkeleton";

export default function ProjectNominations() {
    const { data: nominatedProjects, isLoading, error } = useNominatedProjects();
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [_query, setQuery] = useState("");

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <>
            <div className="flex flex-col gap-4 lg:gap-8">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title="Project Nomination"
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                    />
                    
                </div>
                {(isLoading) && (!isMedium ? 
                    (<TableSkeleton />):
                    (<div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((index) => (
                            <MobileItemSkeleton key={index}/>
                        ))}
                    </div>) 
                )}
                {(error) && (
                    <ErrorState label="project nominations"/>
                )}
                {(nominatedProjects && nominatedProjects?.length === 0) && (
                    <EmptyPage label="No Project Nominations" />
                )}
                {(nominatedProjects && nominatedProjects.length > 0) && (
                    <ProjectNominationsTable
                        data={nominatedProjects}
                        columns={columns}
                    />
                )}
            </div>
        </>
    )
}