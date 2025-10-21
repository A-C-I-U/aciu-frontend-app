import type { ProjectCardProps } from "@/utils/types";
import { Box } from "@mui/material";
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
        <Box
            borderRadius="1.25rem"
            py=".875rem"
            px=".5rem"
            bgcolor="#F9FBFC"
            display="flex"
            flexDirection="column"
            gap={3}
        >
            <Box
                display='flex'
                flexDirection="column"
                gap={2}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap=".875rem"
                >
                    <img src={image} className="rounded-[.313rem] w-full md:h-[9.75rem] min-w-[6.75rem] sm:h-[5.688rem]" />
                    <Box
                        bgcolor="#EBC563"
                        py="7px"
                        px="10px"
                        borderRadius="5px"
                        maxWidth="fit-content"
                    >
                        <span className="font-coolvetica text-xs text-aciu-border-grey font-bold">
                            {badge}
                        </span>
                    </Box>
                </Box>
                <h2 className="text-lg font-bold font-coolvetica text-aciu-border-grey">{name}</h2>
                <DonationProgressBar collected={+collectedFunds} target={+targetFunds} />
                <p className="font-montserrat text-aciu-abriba text-xs leading-[1.5rem]">{description}</p>
            </Box>

            <Link
                to={link}
                className="rounded-[.5rem] 
                border border-aciu-green-normal 
                p-5 max-w-fit font-coolvetica
                text-sm text-aciu-green-normal
                flex gap-2 items-center"
            >
                <span>Donate To Project</span>
                <ArrowRightIcon color="#00B686" size="1.25rem" className="rotate-[-45deg]"/>
            </Link>
        </Box>
    )
}