import { ongoingProjects, projectDetail } from "@/utils/data";
import type { TabItem } from "@/utils/types";
import { Box } from "@mui/material";
import { Location, SecurityCard, User } from "iconsax-react";
import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ProjectOverviewTab } from "./ProjectOverviewTab";
import { DonationsTab } from "./DonationsTab";
import ShareProject from "./ShareProject";
import DonateToProject from "./DonateToProject";

const MotionBox = motion.create(Box);


export default function ProjectDetailsPage() {
    const [showDonateProject, setShowDonateProject] = useState(false);
    const [showShareProject, setShowShareProject] = useState(false);

    // Use id to retrieve content here
    const {
        id,
        title,
        description,
        value,
        badge,
        scope,
        impact,
        donations,
        location,
        targetFunds,
        collectedFunds,
        projectImages,
        projectManager
    } = projectDetail;

    const projectDetailTabs: TabItem[] = [
        {
            key: "project-overview",
            label: "Project Overview",
            content: (
            <ProjectOverviewTab 
                description={description} 
                value={value} 
                impact={impact} 
                scope={scope}
            />)
        },
        {
            key: "donations",
            label: "Donations",
            content: <DonationsTab donations={donations} />
        }
    ]

    const [activeTab, setActiveTab] = useState<TabItem>(projectDetailTabs[0]);


    return (
         <AnimatePresence>
                <MotionBox
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white"
                    mx="1.25rem"
                    my="1.625rem"
                    px={2}
                    py="1.25rem"
                    display="flex"
                    flexDirection="column"
                    gap="2rem"
                >
                    <div 
                        className="border-b border-b-aciu-dark-grey 
                        py-4 px-3.5 lg:px-6.5 flex flex-col gap-4 lg:items-center
                        lg:flex-row lg:gap-0 lg:justify-between"
                    >
                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-xl text-aciu-border-grey line-height-120">
                                {title}
                            </h2>
                            <div className="flex gap-2 items-center">
                                <Location size={20} color="#3E3E3E" />
                                <p className="font-medium text-sm text-aciu-border-grey">
                                    {location}
                                </p>
                            </div>
                        </div>

                        <div className="bg-aciu-yellow py-1.5 px-2.5 rounded-[5px] max-w-fit max-h-fit">
                            <span className="font-coolvetica text-xs text-aciu-border-grey font-bold">
                                {badge}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`px-3.5 lg:px-6.5 project-gallery min-h-78 md:min-h-80 count-${projectImages?.length}`}
                    >
                        {projectImages.map((image, index) => {
                            return (
                                <img
                                    key="index"
                                    loading="lazy"
                                    src={image}
                                    alt={`${title} image ${index}`}
                                />
                            )
                        })}
                    </div>

                    {/* Tabs */}
                    <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-[2fr_1fr]">
                        <div className="">
                            <div className="flex gap-4 md:gap-8 w-full mx-auto px-3.5 lg:px-6.5">
                                {projectDetailTabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab)}
                                        className={`${
                                            activeTab?.key === tab.key
                                            ? "text-aciu-red font-semibold"
                                            : "text-aciu-abriba font-medium pb-4"
                                        } text-xs md:text-sm font-montserrat flex flex-col gap-4`}
                                    >
                                        {tab.label}
                                        {activeTab?.key === tab.key && (
                                            <span className="block w-full h-0.5 bg-aciu-red mt-2 rounded-full"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <hr className="w-full border-t-[.5px] text-aciu-dark-grey" />
                            <div className="px-2.5 md:px-3.5 lg:px-6.5 mt-4">
                                {activeTab?.content}
                            </div>
                        </div>

                        <div className="mx-3.5 lg:mx-0
                            max-w-96 rounded-[.625rem]
                            border border-aciu-border-green h-fit"
                        >
                            <div className="px-5 pt-10 rounded-t-[.625rem] flex flex-col gap-8 bg-aciu-green-normal">
                                <div className="flex gap-10 items-center">
                                    <div className="flex flex-col gap-2.5 text-white">
                                        <p className="text-xs text-aciu-green-light">
                                            Total Raised
                                        </p>
                                        <p className="font-semibold text-sm">
                                            {collectedFunds}
                                        </p>
                                    </div>
                                    <div role="separator" aria-orientation="vertical" className="w-[1px] h-8 bg-gray-300"></div>
                                    <div className="flex flex-col gap-2.5 text-white">
                                        <p className="text-xs text-aciu-green-light">
                                            Our Target
                                        </p>
                                        <p className="font-semibold text-sm">
                                            {targetFunds}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pb-10">
                                    <div className="flex gap-3.5 items-center">
                                        <button
                                            className="py-5 px-4 bg-white rounded-[.625rem] max-w-fit
                                            flex gap-3 items-center"
                                            onClick={() => setShowDonateProject(true)}
                                        >
                                                <span className="text-aciu-green-normal text-sm font-coolvetica whitespace-nowrap">
                                                    Donate to Project
                                                </span>
                                                <ArrowRightIcon color="#00B686" size="1.25rem" className="rotate-[-45deg]"/>
                                        </button>

                                        <button
                                            className="py-5 px-4 bg-inherit rounded-[.625rem] max-w-fit
                                            flex gap-3 items-center border border-white whitespace-nowrap"
                                            onClick={() => setShowShareProject(true)}
                                        >
                                                <span className="text-white text-sm font-coolvetica">
                                                    Share Project
                                                </span>
                                                <ArrowRightIcon color="#fff" size="1.25rem" className="rotate-[-45deg]"/>
                                        </button>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <SecurityCard size={20} color="white" />
                                        <p className="text-xs font-medium text-white">
                                            Secured payments using Stripe
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="px-5 bg-aciu-dark-green pt-6.5 pb-10 rounded-b-[.625rem]">
                                <div className="flex gap-4 items-center">
                                    <User size={24} color="white" />
                                    <div className="flex flex-col gap-2">
                                        <p className="text-aciu-border-green text-sm">
                                            This project is managed by
                                        </p>
                                        <p className="text-sm text-white">
                                            {projectManager}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                   <hr className="w-full border-t-[.5px] text-aciu-dark-grey" />
                    <div className="flex flex-col gap-4 px-3.5 lg:px-6.5">
                        <h2 className="text-2xl line-height-120">
                            You may also want to donate to
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {ongoingProjects
                                .filter(project => project?.id !== id)
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 3)
                                .map((projectDetail, index) => {
                                    const {
                                        name, 
                                        image, 
                                        badge, 
                                        targetFunds, 
                                        collectedFunds, 
                                        description, 
                                        link 
                                    } = projectDetail;
                                    
                                    return (
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
                                )})}
                        </div>
                    </div>
                    <ShareProject
                        link="www.aciuabiriba.org/amogudu-health-centre-roof-repair"
                        open={showShareProject}
                        onClose={() => setShowShareProject(false)}
                    />
                    <DonateToProject
                        open={showDonateProject}
                        onClose={() => setShowDonateProject(false)}
                    />
                </MotionBox>
            </AnimatePresence>
    )
}