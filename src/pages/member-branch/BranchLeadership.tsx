import { BranchExecCard } from "@/components/BranchExecCard";
import { EmptyPage } from "@/components/EmptyPage";
import { useBranchExecutives } from "@/services/hooks/branch";
import { Skeleton } from "@mui/material";

export default function BranchLeadership() {
    const { data: executives, isLoading } = useBranchExecutives();
    return (
        <div className="lg:px-4.5 lg:py-6 w-full flex flex-col gap-6">
            <div className="lg:flex hidden justify-between items-center">
                <h2 className="text-xl leading-[1.2] text-aciu-border-grey">
                   Our Branch Executives
                </h2>
            </div>
            {!isLoading && executives && executives.length === 0 && <EmptyPage label="No branch executives found." />}
            <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
            >
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={200} className="w-full rounded-xl" />
                    ))
                ) : (
                    executives?.map(
                        (branchExec, index) => (
                            <BranchExecCard
                                key={index}
                                branchExec={{
                                    id: index,
                                    name: branchExec.fullName,
                                    position: branchExec.role,
                                    occupation: branchExec.occupation,
                                    email: branchExec.email,
                                    phoneNumber: branchExec.phone
                                }}
                            />
                        )
                    )
                )}
            </div>
        </div>
    )
}