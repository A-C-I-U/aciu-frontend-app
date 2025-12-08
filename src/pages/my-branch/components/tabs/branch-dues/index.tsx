import DataTable from "@/components/DataTable";
import { branchStatusMap, formatDate, generateMockBranchDues } from "@/utils/helpers";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Sort } from "iconsax-react";
import { useState } from "react";
import { columns } from "./columns";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import type { BranchDueDataType, FieldConfig } from "@/utils/types";
import MobileItemCard from "@/components/MobileItem";
import DuesPreview from "./DuesPreview";
import AddBranchDues from "./AddBranchDues";
import SuccessfulDueCreation from "./SuccessfulDueCreation";

export default function BranchDuesTab() {
    const isMedium = useMediaQuery('(max-width:1250px)');
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selected, setSelected] = useState<BranchDueDataType | null>(null);
    const [showAddDues, setShowAddDues] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [dueTitle, setDueTitle] = useState("");

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const handleViewClick = (due: BranchDueDataType) => {
        setSelected(due);
        setIsViewOpen(true);
    }

    const table = useReactTable<BranchDueDataType>({
        data: mockData,
        columns: columns(handleViewClick),
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <>
        <div className="flex flex-col gap-6 px-4">
            <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                <h2 className="text-xl text-aciu-border-grey">
                    Branch Dues
                </h2>
                <div className="flex gap-4 items-center">
                    <button className="section-action-button">
                        Filter
                        <Sort variant="Outline" color="#A4ACB9" size={20} />
                    </button>
                    <button 
                        onClick={() => {setShowAddDues(true)}}
                        className="btn btn-primary">
                        Add new dues
                    </button>
                </div>
            </div>


            <>
                {!isMedium ?
                    <DataTable 
                        table={table}
                    />
                    :
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        {currentItems.map((branchDue: BranchDueDataType) => (
                            <MobileItemCard
                                key={branchDue.id}
                                item={branchDue}
                                fields={fields}
                                status={branchStatusMap[branchDue.status]}
                                actionLabel="View Dues"
                                onActionClick={() => {}}
                            />
                        ))}
                    </div>
                }
                {isMedium &&
                    <PaginationControls
                        total={mockData.length}
                        page={page}
                        onPageChange={setPage}
                        itemsPerPage={itemsPerPage}
                    />
                }
            </>  
        </div>

        {/* This has the same intention as the function in `SuccessfulEventCreation`
          * Another approach might be needed to pass `duesTitle` to 
          * `SuccessfulDuesCreation`.
         */}
        <AddBranchDues
            open={showAddDues}
            onClose={() => setShowAddDues(false)}
            onSuccess={(values: any) => {
                setDueTitle(values.dueTitle)
                setIsSuccessOpen(true)
            }}
        />

        <DuesPreview
            open={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            due={selected}
        />

        <SuccessfulDueCreation
            dueTitle={dueTitle}
            open={isSuccessOpen}
            onClose={() => setIsSuccessOpen(false)}
            addBranchDues={() => {
                setShowAddDues(false);
                setIsSuccessOpen(false);
            }}
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
