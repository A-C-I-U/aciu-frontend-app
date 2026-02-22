import DonationProgressBar from "./DonationProgressBar";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import type { Project } from "@/services/types/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, images, category, briefDescription, donationStats } =
    project;

  const { totalDonated, targetAmount, percentageReached } = donationStats;

  const displayImage = images && images.length > 0 ? images[0] : "";

  return (
    <div className="rounded-[1.25rem] py-3.5 px-2 bg-card-200 flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-3.5">
          {displayImage && (
            <img
              src={displayImage}
              alt={title}
              className="rounded-md w-full h-36.25 min-w-27 object-cover"
              loading="lazy"
            />
          )}

          <div className="event-tag py-1.5 px-2.5 rounded-md">
            <span className="font-coolvetica text-xs text-aciu-border-grey font-bold leading-default">
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
        className="rounded-lg border border-aciu-green-normal p-3 max-w-46 leading-none mt-auto
        font-coolvetica text-sm text-aciu-green-normal flex gap-2 items-center justify-center hover:bg-aciu-green-normal hover:text-white transition-colors"
      >
        <span>View Project</span>
        <ArrowRightIcon
          color="currentColor"
          size="1.25rem"
          className="rotate-[-45deg]"
        />
      </Link>
    </div>
  );
}