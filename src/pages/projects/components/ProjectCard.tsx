import type { ProjectCardProps } from "@/utils/types";
import DonationProgressBar from "./DonationProgressBar";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function ProjectCard({
    name,
    image,
    badge,
    targetFunds,
    collectedFunds,
    description,
    link
}: ProjectCardProps) {
    return (
        <div className="rounded-[1.25rem] py-3.5 px-2 bg-card-200 flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-[.875rem]">
                <img
                    src={image}
                    alt={name}
                    className="rounded-[.313rem] w-full md:h-38.5 min-w-27 sm:h-23"
                    loading="lazy"
                />

                <div className="bg-aciu-yellow py-2 px-2.5 rounded-[5px] max-w-fit">
                    <span className="font-coolvetica text-xs text-aciu-border-grey font-bold">
                    {badge}
                    </span>
                </div>
                </div>

                <h2
                    title={name}
                    className="text-lg font-bold font-coolvetica text-aciu-border-grey truncate"
                >
                    {name}
                </h2>

                <DonationProgressBar collected={+collectedFunds} target={+targetFunds} />

                <p className="font-montserrat text-aciu-abriba text-xs leading-6">
                    {description}
                </p>
            </div>

            <Link
                to={link}
                className="rounded-[.5rem] border border-aciu-green-normal p-5 max-w-fit 
                font-coolvetica text-sm text-aciu-green-normal flex gap-2 items-center"
            >
                <span>Donate To Project</span>
                <ArrowRightIcon
                    color="#00B686"
                    size="1.25rem"
                    className="rotate-[-45deg]"
                />
            </Link>
        </div>

    )
}