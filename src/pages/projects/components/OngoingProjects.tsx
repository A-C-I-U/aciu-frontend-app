import SectionHeader from "@/components/SectionHeader";
import { ongoingProjects } from "@/utils/data";
import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { useMediaQuery } from "@mui/material";

const sectionActions = [
    <button
        key="filter"
        className="flex gap-2.5 items-center p-2.5 
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-[50px] 
        border border-aciu-card-grey"
    >
        Filter
        <Sort variant="Outline" color="#A4ACB9" size={20} />
    </button>,

    <button
        key="month"
        className="flex gap-2.5 items-center p-2.5
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-[50px]
        border border-aciu-card-grey"
    >
        Monthly
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>,

    <button
        key="year"
        className="flex gap-2.5 items-center p-2.5
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-[50px]
        border border-aciu-card-grey"
    >
        2022
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>,
]


export default function OngoingProjects() {
    const [query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 992px)");


    const handleSearch = (q: string) => {
        setQuery(q)
        console.log(query)
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
                <SectionHeader
                    title="Ongoing Projects"
                    onSearch={handleSearch}
                    showSearch
                    actions={isMedium ? [] : sectionActions}
                />
                <button
                    style={{
                        padding: "1rem",
                        gap: ".5rem",
                        borderRadius: ".75rem",
                        backgroundColor: "#00B686",
                        color: "#fff",
                        fontFamily: "'Coolvetica', sans-serif",
                        width: "fit-content",
                        whiteSpace: "nowrap"
                    }}
                    >
                        Nominate a Project
                </button>
            </div>
           


            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                {ongoingProjects.map(({ 
                    name, 
                    image, 
                    badge, 
                    targetFunds, 
                    collectedFunds, 
                    description, 
                    link 
                }, index) => (
                    <ProjectCard
                        key={index}
                        name={name}
                        image={image}
                        badge={badge}
                        targetFunds={targetFunds}
                        collectedFunds={collectedFunds}
                        description={description}
                        link={link}
                    />
                ))}
            </div>
        </div>
    )
}