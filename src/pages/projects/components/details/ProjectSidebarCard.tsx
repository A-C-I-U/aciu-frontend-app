import type { ProjectSidebarCardProps } from "@/utils/types";
import { SecurityCard, User } from "iconsax-react";
import { ArrowRightIcon } from "lucide-react";

export default function ProjectSidebarCard({
    collectedFunds,
    targetFunds,
    projectManager,
    onDonateClick,
    onShareClick,
    isCompleted = false, 
}: ProjectSidebarCardProps) {
    
  return (
    <div className="mx-3.5 lg:mr-3.5 lg:mx-0 order-1 lg:order-2">
      <div className="w-full md:max-w-96 rounded-[.625rem] border border-aciu-border-green h-fit">
        <div className="px-5 pt-10 rounded-t-[.625rem] flex flex-col gap-8 bg-aciu-green-normal">

            <div className="flex lg:gap-10 items-center justify-between lg:justify-normal">
            <div className="flex flex-col gap-2.5 text-white">
                <p className="text-xs text-aciu-green-light">Total Raised</p>
                <p className="font-semibold text-sm">{collectedFunds}</p>
            </div>

            <div
                role="separator"
                aria-orientation="vertical"
                className="w-[1px] h-8 bg-gray-300"
            ></div>

            <div className="flex flex-col gap-2.5 text-white">
                <p className="text-xs text-aciu-green-light">Our Target</p>
                <p className="font-semibold text-sm">{targetFunds}</p>
            </div>
            </div>


            <div className="flex flex-col gap-2 pb-10">
                <div className="flex flex-col lg:flex-row gap-3.5 items-center">
                    {/* Conditionally render donate button based on isCompleted */}
                    {!isCompleted && (
                      <button
                          onClick={onDonateClick}
                          className="py-5 px-4 bg-white rounded-[.625rem] lg:max-w-fit
                          flex gap-3 items-center w-full justify-center lg:justify-normal"
                          aria-label="Open Donate to Project Modal"
                      >
                      <span className="text-aciu-green-normal text-sm font-coolvetica whitespace-nowrap">
                          Donate to Project
                      </span>
                      <ArrowRightIcon
                          color="#00B686"
                          size="1.25rem"
                          className="rotate-[-45deg]"
                      />
                      </button>
                    )}
                    
                    {/* If project is completed, you might want to show a different message or button */}
                    {isCompleted && (
                      <div className="py-5 px-4 bg-aciu-green-dark rounded-[.625rem] lg:max-w-fit
                          flex gap-3 items-center w-full justify-center lg:justify-normal">
                        <span className="text-white text-sm font-coolvetica whitespace-nowrap">
                          Project Completed
                        </span>
                      </div>
                    )}

                    <button
                        onClick={onShareClick}
                        className="py-5 px-4 bg-inherit rounded-[.625rem] w-full lg:max-w-fit
                        flex gap-3 items-center justify-center lg:justify-normal border border-white whitespace-nowrap"
                        aria-label="Open Share Link Modal"
                    >
                    <span className="text-white text-sm font-coolvetica">
                        Share Project
                    </span>
                    <ArrowRightIcon
                        color="#fff"
                        size="1.25rem"
                        className="rotate-[-45deg]"
                    />
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
                    <p className="text-sm text-white">{projectManager}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}