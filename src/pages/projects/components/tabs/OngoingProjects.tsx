import SectionHeader from "@/components/SectionHeader";
import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import ProjectCard from "../ProjectCard";
import { useMediaQuery } from "@mui/material";
import NominateProject from "../actions/NominateProject";
import { useProjects } from "@/services/hooks/project";
import { ProjectSkeleton } from "../ProjectSkeleton";
import { useUser } from "@/context/UserContext";
import CreateProject from "../actions/CreateProject";

const sectionActions = [
    <button
        key="filter"
        className="section-action-button"
    >
        Filter
        <Sort variant="Outline" color="#A4ACB9" size={20} />
    </button>,
    <button
        key="year"
        className="section-action-button"
    >
        2022
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>,
];

export default function OngoingProjects() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [showNominate, setShowNominate] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    
    const { data: projects, isLoading, error } = useProjects('ongoing');
    const { user } = useUser();

    const handleSearch = (q: string) => {
        setQuery(q);
    } 

    if (error) {
        return (
            <div className="flex flex-col gap-4 lg:gap-8">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title="Ongoing Projects"
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                    />
                    <button 
                        className="btn btn-primary max-w-fit"
                        onClick={() => setShowNominate(true)}
                    >
                        Nominate a Project
                    </button>
                </div>
                <div className="text-center py-8 text-red-500">
                    Failed to load ongoing projects. Please try again.
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Ongoing Projects"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                {user?.role === "national_admin" ?
                        <button 
                            className="btn btn-primary max-w-fit !text-sm md:!text-base"
                            onClick={() => setShowCreate(true)}
                        >
                            Create Project
                        </button>
                    :
                        <button 
                            className="btn btn-primary max-w-fit !text-sm md:!text-base"
                            onClick={() => setShowNominate(true)}
                        >
                            Nominate a Project
                        </button>
                    }
                    
            </div>

            {isLoading ? (
                <div className={`grid ${isMedium ? "md:grid-cols-2" : "lg:grid-cols-3"} lg:gap-4`}>
                    {[...Array(6)].map((_, index) => (
                        <ProjectSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className={`grid ${isMedium ? "md:grid-cols-2" : "lg:grid-cols-3"} lg:gap-4`}>
                    {projects?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                    {projects?.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No ongoing projects found.
                        </div>
                    )}
                </div>
            )}

            <NominateProject 
                open={showNominate}
                onClose={() => setShowNominate(false)}
            />
            <CreateProject
                open={showCreate}
                onClose={() => setShowCreate(false)}
            />
        </div>
    );
}