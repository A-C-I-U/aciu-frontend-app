import { EmptyPage } from "@/components/EmptyPage";
import { StatusBadge } from "@/components/StatusBadge";
import { useBranchDues } from "@/services/hooks/branch";
import type { BranchDue } from "@/services/types/branch";
import { branchStatusMap } from "@/utils/helpers";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

function BranchDuesCard({ due }: { due: BranchDue }) {
    const {
        status,
        intervals,
        amount
    } = due;

    const {
        label,
        labelColor,
        bgColor,
        dotColor
    } = branchStatusMap[status as "inactive" | "active"];

    return (
        <div className="border border-aciu-light-grey rounded-2xs w-full">
            <div className="px-3.25 py-4.25 flex flex-col gap-6.5">
                <div className="flex justify-between items-center">
                    <StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} className="w-97"/>
                    <p className="font-semibold text-aciu-green-normal leading-[1.2]">NGN {amount}</p>
                </div>
            </div>
            <Divider orientation="horizontal" className="text-aciu-dark-grey" flexItem />
            <div className="pt-2 px-4 bg-aciu-body flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="text-sm leading-[1.2] text-aciu-abriba">Intervals</p>
                    <p className="text-sm leading-[1.2] text-aciu-abriba">{intervals}</p>
                </div>
            </div>
        </div>
    )
}

export default function BranchDues() {
    const { data: duesData, isLoading } = useBranchDues();
    return (
        <div className="lg:px-4.5 lg:py-6 flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center">
                <h2 className="lg:block hidden text-xl leading-[1.2] text-aciu-border-grey">
                    Branch Dues
                </h2>
                <Link to="/my-payments" className="btn btn-primary max-w-fit">
                    View my Payments
                </Link>
            </div>
            {!duesData && !isLoading && (
                <EmptyPage label="No branch dues found." />
            )}
            <div className="grid gap-x-5 gap-y-4 md:grid-cols-2 md:max-w-150 lg:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:max-w-full overflow-y-auto no-scrollbar">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <BranchDuesCardSkeleton key={i} />
                        ))
                    : duesData?.map((due) => (
                        <BranchDuesCard key={due.id} due={due} />
                ))}
            </div>  
        </div>
    )
}


function BranchDuesCardSkeleton() {
  return (
    <div className="border border-aciu-light-grey rounded-2xs w-full animate-pulse">
      <div className="px-3.25 py-4.25 flex flex-col gap-6.5">
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 bg-gray-200 rounded-md" />

          <div className="h-5 w-20 bg-gray-200 rounded-md" />
        </div>
      </div>

      <Divider
        orientation="horizontal"
        className="text-aciu-dark-grey"
        flexItem
      />

      <div className="py-2 px-4 bg-aciu-body flex justify-between items-center">
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-20 bg-gray-200 rounded" />

          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
