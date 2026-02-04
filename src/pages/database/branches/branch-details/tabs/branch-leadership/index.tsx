import { BranchExecCard } from "@/components/BranchExecCard";
import { branchExecutiveMockData } from "@/utils/data";
import { useState } from "react";
import BranchPresidentForm from "./BranchPresidentForm";

export default function BranchExecutivesTab() {
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-6 px-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="hidden lg:block text-xl text-aciu-border-grey">
                        Branch Executives
                    </h2>
                    <button 
                        className="btn btn-primary max-w-fit text-sm! md:text-base!"
                        onClick={() => setIsAddOpen(true)}
                    >
                        Add admin
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
                            />
                        )
                    )}
                </div>
            </div>
            <BranchPresidentForm
                mode="create"
                open={isAddOpen}
                onClose={() => setIsAddOpen(false)}
            />
        </>
    )
}