import { BranchExecCard } from "@/components/BranchExecCard";
import { branchExecutiveMockData } from "@/utils/data";
import { useState } from "react";
import BranchPresidentForm from "./BranchPresidentForm";

export default function BranchExecutivesTab() {
    const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
    const chairman = true;

    return (
        <>
            <div className="flex flex-col gap-6 px-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="hidden lg:block text-xl text-aciu-border-grey">
                        Branch Executives
                    </h2>
                    {/* We should be able to change the text and function here based on whether there is a branch chairman or not */}
                    <button
                        className="btn btn-primary max-w-fit text-sm! md:text-base!"
                        onClick={() => {
                            if (chairman) {
                                setFormMode("edit");
                            } else {
                                setFormMode("create");
                            }
                        }}
                    >
                        {chairman ? "Change Branch President" : "Assign Branch President"}
                    </button>
                </div>
                <div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
                >
                    {branchExecutiveMockData.map(
                        (branchExec) => (
                            <BranchExecCard
                                key={branchExec.id}
                                branchExec={branchExec}
                                onEdit={() => setFormMode("edit")}
                            />
                        )
                    )}
                </div>
            </div>
            <BranchPresidentForm
                mode={formMode}
                open={formMode !== null}
                onClose={() => setFormMode(null)}
            />
        </>
    )
}