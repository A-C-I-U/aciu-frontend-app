import { useParams, useNavigate } from "react-router-dom";
import type { TabItem } from "@/utils/types";
import { ArrowLeft, Location } from "iconsax-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";
import { ProjectOverviewTab } from "../ProjectOverviewTab";
import { DonationsTab } from "./DonationsTab";
import ShareProject from "../actions/ShareProject";
import DonateToProject from "../actions/DonateToProject";
import ProjectSidebarCard from "./ProjectSidebarCard";
import MotionBox from "@/components/MotionBox";
import { useProjects, useProjectDonations } from "@/services/hooks/project";
import { useMarkProjectAsCompleted } from "@/services/mutations/projects";
import { enqueueSnackbar } from "notistack";
import { EmptyPage } from "@/components/EmptyPage";
import PageDetailSkeleton from "@/components/PageDetailSkeleton";
import { useUser } from "@/context/UserContext";
import CreateProject from "../actions/CreateProject";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [showDonateProject, setShowDonateProject] = useState(false);
  const [showShareProject, setShowShareProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [activeTab, setActiveTab] = useState<TabItem | null>(null);



  const { data: ongoingProjects, isLoading: isLoadingOngoing, error: errorOngoing } = useProjects("ongoing");
  const { data: completedProjects, isLoading: isLoadingCompleted, error: errorCompleted } = useProjects("completed");
  const { data: donations } = useProjectDonations(id!);
  const markAsCompletedMutation = useMarkProjectAsCompleted();

  const ongoingProject = ongoingProjects?.find((p) => p.id === id);
  const completedProject = completedProjects?.find((p) => p.id === id);

  const project = ongoingProject || completedProject;
  const isCompletedProject = !!completedProject;

  const relatedProjects = !isCompletedProject ?
    ongoingProjects
      ?.filter((p) => p.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3) || []
    : [];

  const isLoading = isLoadingOngoing || isLoadingCompleted;
  const error = errorOngoing || errorCompleted;

  const projectDetailTabs: TabItem[] = [
    {
      key: "project-overview",
      label: "Project Overview",
      content: project ? (
        <ProjectOverviewTab
          description={project.briefDescription}
          value={project.whyItMatters}
          impact={project.projectImpact}
          scope={project.projectScope}
        />
      ) : null,
    },
    {
      key: "donations",
      label: "Donations",
      content: <DonationsTab donations={donations || []} />,
    },
  ];

  useEffect(() => {
    if (project && !activeTab) {
      setActiveTab(projectDetailTabs[0]);
    }
  }, [project, activeTab]);


  useEffect(() => {
    if (error) {
      enqueueSnackbar(`Error loading project data: ${error.message}`, {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar]);


  const handleMarkAsCompleted = async () => {
    try {
      const result = await markAsCompletedMutation.mutateAsync({ id: id! });
      enqueueSnackbar(result.message || "Project marked as completed successfully", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar(error.message || "Failed to mark project as completed", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/projects")}
        className="cancel-btn"
      >
        <ArrowLeft size={20} color="#898483" />
        <span className="ml-3">Back</span>
      </button>

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
          {isLoading ? (
            <PageDetailSkeleton />
          ) : !project ? (
            <EmptyPage label="project details" />
          ) : (
            <>
              <div
                className="border-b border-b-aciu-dark-grey 
                py-4 px-3.5 lg:px-6.5 flex flex-col gap-4 lg:items-center
                lg:flex-row lg:gap-0 lg:justify-between"
              >
                <div className="flex flex-col gap-2 ">
                  <h2 className="text-xl text-aciu-border-grey line-height-120">
                    {project.title}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <Location size={20} color="#3E3E3E" />
                    <p className="font-medium text-sm text-aciu-border-grey">
                      {project.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="event-tag py-1.5 px-2.5 rounded-md">
                    <span className="font-coolvetica text-xs text-aciu-border-grey font-bold">
                      {project.category}
                    </span>
                  </div>
                  {isCompletedProject && (
                    <div className="event-tag py-1.5 px-2.5 rounded-md bg-green-100">
                      <span className="font-coolvetica text-xs text-green-700 font-bold">
                        Completed
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`px-3.5 lg:px-6.5 project-gallery min-h-78 md:min-h-80 count-${project.images?.length || 0
                  }`}
              >
                {project.images && project.images.length > 0 ? (
                  project.images.map((image, index) => (
                    <img
                      key={index}
                      loading="lazy"
                      src={image}
                      alt={`${project.title} image ${index}`}
                      onError={(e) => {
                        e.currentTarget.src = "/images/project-placeholder.jpg";
                      }}
                      className={`${project.images.length < 3 ? "max-h-80" : "max-h-auto"}`}
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
                    {projectDetailTabs?.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab)}
                        className={`${activeTab?.key === tab.key
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
                  collectedFunds={project.donationStats.totalDonated}
                  targetFunds={project.donationStats.targetAmount}
                  projectManager={project.fundStatus.managedBy}
                  onDonateClick={() => !isCompletedProject && setShowDonateProject(true)}
                  onShareClick={() => setShowShareProject(true)}
                  isCompleted={isCompletedProject}
                  userRole={user?.role}
                  onEditClick={() => !isCompletedProject && setShowEditProject(true)}
                  onCompleteClick={handleMarkAsCompleted}
                />
              </div>

              {!isCompletedProject && relatedProjects.length > 0 && (
                <>
                  <hr className="w-full border-t-[.5px] text-aciu-dark-grey" />

                  <div className="flex flex-col gap-4 px-3.5 lg:px-6.5">
                    <h2 className="text-2xl line-height-120">
                      You may also want to donate to
                    </h2>
                    <div className="grid lg:grid-cols-3 items-stretch gap-4">
                      {relatedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <ShareProject
                link={`https://aciu-abriba.org/projects/${id}`}
                open={showShareProject}
                onClose={() => setShowShareProject(false)}
              />

              {!isCompletedProject && (
                <DonateToProject
                  open={showDonateProject}
                  onClose={() => setShowDonateProject(false)}
                />
              )}

              <CreateProject
                open={showEditProject}
                onClose={() => setShowEditProject(false)}
                id={id}
              />
            </>
          )}
        </MotionBox>
      </AnimatePresence>
    </>
  );
}