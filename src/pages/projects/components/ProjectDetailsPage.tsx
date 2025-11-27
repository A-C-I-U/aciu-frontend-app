import { useParams, useNavigate } from "react-router-dom";
import type { TabItem } from "@/utils/types";
import { Location } from "iconsax-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ProjectOverviewTab } from "./ProjectOverviewTab";
import { DonationsTab } from "./DonationsTab";
import ShareProject from "./ShareProject";
import DonateToProject from "./DonateToProject";
import ProjectSidebarCard from "./ProjectSidebarCard";
import MotionBox from "@/components/MotionBox";
import { useProjects, useProjectDonations } from "@/services/hooks/project";
import { EventItemSkeleton } from "@/components/EventSkeleton";
import { enqueueSnackbar } from "notistack";
import { Icon } from "@iconify/react";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDonateProject, setShowDonateProject] = useState(false);
  const [showShareProject, setShowShareProject] = useState(false);

  const { data: allProjects, isLoading, error } = useProjects("ongoing");
  const { data: donations } = useProjectDonations(id!);
  // Find the current project from the fetched data
  const project = allProjects?.find((p) => p.id === id);

  // Get related projects (excluding current project)
  const relatedProjects =
    allProjects
      ?.filter((p) => p.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3) || [];

  if (error) {
    enqueueSnackbar(`Error loading projects: ${error.message}`, {
      variant: "error",
    });
  }

  if (isLoading) {
    return (
      <MotionBox
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white"
        mx="1.25rem"
        my="1.625rem"
        py="1.25rem"
        display="flex"
        flexDirection="column"
        gap="2rem"
      >
        <EventItemSkeleton />
      </MotionBox>
    );
  }

  if (!project) {
    return (
      <MotionBox
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white"
        mx="1.25rem"
        my="1.625rem"
        py="1.25rem"
        display="flex"
        flexDirection="column"
        gap="2rem"
      >
        <div className="text-center py-12">
          <p className="text-aciu-abriba text-lg">Project not found.</p>
          <button
            onClick={() => navigate("/projects")}
            className="mt-4 flex items-center gap-2 text-aciu-red font-coolvetica font-semibold"
          >
            <Icon icon="mdi:arrow-left" width="20" height="20" />
            Back to Projects
          </button>
        </div>
      </MotionBox>
    );
  }

  const {
    title,
    category,
    location: projectLocation,
    briefDescription,
    projectScope,
    projectImpact,
    whyItMatters,
    images,
    donationStats,
    fundStatus,
  } = project;

  const projectDetailTabs: TabItem[] = [
    {
      key: "project-overview",
      label: "Project Overview",
      content: (
        <ProjectOverviewTab
          description={briefDescription}
          value={whyItMatters}
          impact={projectImpact}
          scope={projectScope}
        />
      ),
    },
    {
      key: "donations",
      label: "Donations",
      content: <DonationsTab donations={donations || []} />,
    },
  ];

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
        py="1.25rem"
        display="flex"
        flexDirection="column"
        gap="2rem"
      >
        <div className="px-3.5 lg:px-6.5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-aciu-red font-coolvetica font-semibold mb-4"
          >
            <Icon icon="mdi:arrow-left" width="20" height="20" />
            Back
          </button>
        </div>

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
                {projectLocation}
              </p>
            </div>
          </div>

          <div className="bg-aciu-yellow py-1.5 px-2.5 rounded-[5px] max-w-fit max-h-fit">
            <span className="font-coolvetica text-xs text-aciu-border-grey font-bold">
              {category}
            </span>
          </div>
        </div>

        <div
          className={`px-3.5 lg:px-6.5 project-gallery min-h-78 md:min-h-80 count-${
            images?.length || 0
          }`}
        >
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                loading="lazy"
                src={image}
                alt={`${title} image ${index}`}
                onError={(e) => {
                  e.currentTarget.src = "/images/project-placeholder.jpg";
                }}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
              <p className="text-aciu-abriba">No images available</p>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:gap-0 lg:grid-cols-[2fr_1fr]">
          <div className="order-2 lg:order-1">
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

          <ProjectSidebarCard
            collectedFunds={donationStats.totalDonated}
            targetFunds={donationStats.targetAmount}
            projectManager={fundStatus.managedBy}
            onDonateClick={() => setShowDonateProject(true)}
            onShareClick={() => setShowShareProject(true)}
          />
        </div>

        <hr className="w-full border-t-[.5px] text-aciu-dark-grey" />

        <div className="flex flex-col gap-4 px-3.5 lg:px-6.5">
          <h2 className="text-2xl line-height-120">
            You may also want to donate to
          </h2>
          <div className="grid lg:grid-cols-3 items-stretch gap-4">
            {relatedProjects.length > 0 ? (
              relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No related projects found.
              </div>
            )}
          </div>
        </div>

        <ShareProject
          link={`https://aciu-abriba.org/projects/${id}`}
          open={showShareProject}
          onClose={() => setShowShareProject(false)}
        />

        <DonateToProject
          open={showDonateProject}
          onClose={() => setShowDonateProject(false)}
        />
      </MotionBox>
    </AnimatePresence>
  );
}
