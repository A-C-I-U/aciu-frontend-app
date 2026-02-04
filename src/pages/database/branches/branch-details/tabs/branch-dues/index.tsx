import { branchStatusMap, formatDate, generateMockBranchDues } from "@/utils/helpers";
import { Sort } from "iconsax-react";
import { useState } from "react";
import type { BranchDueDataType, FieldConfig } from "@/utils/types";
import MobileItemCard from "@/components/MobileItem";
import DuesPreview from "./DuesPreview";
import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";

export default function BranchDuesTab() {
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selected, setSelected] = useState<BranchDueDataType | null>(null);


    const handleViewClick = (due: BranchDueDataType) => {
        setSelected(due);
        setIsViewOpen(true);
    }

    return (
        <>
        <div className="flex flex-col gap-6 px-4">
            <div className="flex flex-col flex-wrap gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="hidden lg:block text-xl text-aciu-border-grey">
                    Branch Dues
                </h2>
                <div className="flex gap-4 items-center">
                    <button className="section-action-button">
                        Filter
                        <Sort variant="Outline" color="#A4ACB9" size={20} />
                    </button>
                </div>
            </div>


            <ResponsiveDataTable
                data={mockData}
                columns={mockData}
                renderMobileItem={(branchDue: BranchDueDataType) => (
                    <MobileItemCard
                        key={branchDue.id}
                        item={branchDue}
                        fields={fields}
                        status={branchStatusMap[branchDue.status]}
                        actionLabel="View Dues"
                        onActionClick={() => handleViewClick(branchDue)}
                    />
                )}
            />
        </div>

        <DuesPreview
            open={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            id={selected && selected?.id}
            onEdit={() => {}}
        />
        </>
    )
}


const mockData = generateMockBranchDues(20);
const fields: FieldConfig<BranchDueDataType>[] = [
  {
    label: "Amount Paid",
    value: (p) => `N${(+p.amountPaid).toLocaleString()}`,
  },
  {
    label: "Due Type",
    value: (p) => p.dueType,
  },
  {
    label: "Date",
    value: (p) => formatDate(p.creationDate),
  },
  {
    label: "Intervals",
    value: (p) => p.intervals,
  },
];
