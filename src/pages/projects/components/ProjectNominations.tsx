import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import { useNominatedProjects } from "@/services/hooks/project"
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { EmptyPage } from "@/components/EmptyPage";
import ErrorState from "@/components/ErrorState";
import { columns } from "./ProjectNomColumns";
import ProjectNominationsTable from "./ProjectNominationsTable";

export default function ProjectNominations() {
    const { data: nominatedProjects, isLoading, error } = useNominatedProjects();
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [_query, setQuery] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    console.log(nominatedProjects)

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Project Nomination"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                <button 
                    className="py-3 px-1 text-sm md:text-base md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
                    onClick={() => setShowCreate(true)}
                >
                    Create Project
                </button>
            </div>
            {(isLoading) && (
                <></>
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
    )
}