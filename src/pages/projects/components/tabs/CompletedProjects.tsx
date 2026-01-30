import SectionHeader from "@/components/SectionHeader";
import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import ProjectCard from "../ProjectCard";
import { useMediaQuery, Skeleton } from "@mui/material";
import { useProjects } from "@/services/hooks/project";
import { EmptyPage } from "@/components/EmptyPage";

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
];

export default function CompletedProjects() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    
    const { data: projects, isLoading, error } = useProjects('completed');

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    const ProjectSkeleton = () => (
        <div className="rounded-[1.25rem] py-3.5 px-2 bg-card-200 flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex flex-col gap-3.5">
                    <Skeleton variant="rounded" width="100%" height={154} />
                    <Skeleton variant="rounded" width={100} height={32} />
                </div>
                <Skeleton variant="text" width="80%" height={32} />
                <Skeleton variant="rounded" width="100%" height={8} />
                <Skeleton variant="text" width="100%" height={60} />
            </div>
            <Skeleton variant="rounded" width={184} height={56} />
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col gap-4 lg:gap-8">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title="Completed Projects"
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                    />
                </div>
                <div className="text-center py-8 text-red-500">
                    Failed to load completed projects. Please try again.
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Completed Projects"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
            </div>

            {isLoading ? (
                <div className={`grid ${isMedium ? "md:grid-cols-2" : "lg:grid-cols-3"} lg:gap-4`}>
                    {[...Array(6)].map((_, index) => (
                        <ProjectSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <>
                    <div className={`grid ${isMedium ? "md:grid-cols-2" : "lg:grid-cols-3"} lg:gap-4`}>
                        {projects?.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isCompleted={true} 
                            />
                        ))}
                    </div>
                    {projects?.length === 0 && (
                        <EmptyPage label="Completed Projects" />
                    )}
                </>
            )}
        </div>
    );
}