import DonationProgressBar from "./DonationProgressBar";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import type { Project } from "@/services/types/projects";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const {
        id,
        title, 
        image, 
        category, 
        briefDescription, 
        donationStats,
    } = project;

    const { totalDonated, targetAmount, percentageReached } = donationStats;

    return (
        <div className="rounded-[1.25rem] py-3.5 px-2 bg-card-200 flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex flex-col gap-3.5">
                    <img
                        src={image}
                        alt={title}
                        className="rounded-[.313rem] w-full md:h-38.5 min-w-27 sm:h-23 object-cover"
                        loading="lazy"
                    />

                    <div className="bg-aciu-yellow py-2 px-2.5 rounded-[5px] max-w-fit">
                        <span className="font-coolvetica text-xs text-aciu-border-grey font-bold">
                            {category}
                        </span>
                    </div>
                </div>

                <h2
                    title={title}
                    className="text-lg font-bold font-coolvetica text-aciu-border-grey truncate"
                >
                    {title}
                </h2>

                <DonationProgressBar 
                    collected={totalDonated} 
                    target={targetAmount}
                    percentage={percentageReached}
                />

                <p className="font-montserrat text-aciu-abriba text-xs leading-6">
                    {briefDescription}
                </p>
            </div>

            <Link
                to={`/projects/${id}`}
                className="rounded-[.5rem] border border-aciu-green-normal p-5 max-w-46
                font-coolvetica text-sm text-aciu-green-normal flex gap-2 items-center hover:bg-aciu-green-normal hover:text-white transition-colors"
            >
                <span>Donate To Project</span>
                <ArrowRightIcon
                    color="currentColor"
                    size="1.25rem"
                    className="rotate-[-45deg]"
                />
            </Link>
        </div>
    );
}