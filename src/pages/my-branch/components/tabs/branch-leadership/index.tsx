import { BranchExecCard } from "@/components/BranchExecCard";
import { branchExecutiveMockData } from "@/utils/data";

export default function BranchExecutivesTab() {
    return (
        <div className="flex flex-col gap-6 px-4">
            <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                <h2 className="text-xl text-aciu-border-grey">
                    Branch Dues
                </h2>
                <button className="section-primary-action lg:py-4 lg:px-4 pointer-events-none">
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
    )
}