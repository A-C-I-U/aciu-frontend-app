import DataTable from "@/components/DataTable";
import { branchStatusMap, formatDate } from "@/utils/helpers";
import { useMediaQuery, Skeleton } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Sort } from "iconsax-react";
import { useState, useCallback, useMemo } from "react";
import { columns } from "./columns";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import type { BranchDueDataType, FieldConfig } from "@/utils/types";
import MobileItemCard from "@/components/MobileItem";
import DuesPreview from "./DuesPreview";
import AddBranchDues from "./AddBranchDues";
import SuccessfulDueCreation from "./SuccessfulDueCreation";
import { useBranchDues } from "@/services/hooks/branch";

export default function BranchDuesTab() {
    const isMedium = useMediaQuery('(max-width:1250px)');
    const itemsPerPage = 6;
    const [page, setPage] = useState(1);

    const { data: duesData, isLoading } = useBranchDues();

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selected, setSelected] = useState<BranchDueDataType | null>(null);
    const [showAddDues, setShowAddDues] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [dueTitle, setDueTitle] = useState("");

    // ✅ Memoize transformed data
    const tableData: BranchDueDataType[] = useMemo(() =>
        duesData?.map(due => ({
            id: due.id,
            amountPaid: due.amount.toString(),
            dueType: due.dueType,
            creationDate: due.date,
            intervals: due.intervals,
            status: due.status.toLowerCase() as BranchDueDataType["status"],
            // Optional fields not returned by API yet
            createdBy: undefined,
            startDate: undefined,
            endDate: undefined,
            dueRules: undefined,
            activityLogs: undefined
        })) || [],
        [duesData]
    );

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = tableData.slice(start, end);

    const handleViewClick = useCallback((due: BranchDueDataType) => {
        setSelected(due);
        setIsViewOpen(true);
    }, []);

    // Memoize columns to prevent infinite re-renders
    const tableColumns = useMemo(
        () => columns(handleViewClick),
        [handleViewClick]
    );

    const table = useReactTable<BranchDueDataType>({
        data: tableData,
        columns: tableColumns,
        pageCount: Math.ceil(tableData.length / itemsPerPage),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize: itemsPerPage,
            },
        },
    });

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
                        <button
                            onClick={() => { setShowAddDues(true) }}
                            className="btn btn-primary max-w-fit !text-sm md:text-base!">
                            Add new dues
                        </button>
                    </div>
                </div>


                <>
                    {isLoading ? (
                        <div className="flex flex-col gap-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} variant="rectangular" height={60} className="w-full rounded-md" />
                            ))}
                        </div>
                    ) : (
                        <>
                            {!isMedium ?
                                <DataTable
                                    table={table}
                                />
                                :
                                <div className="grid gap-4 md:grid-cols-2">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((branchDue: BranchDueDataType) => (
                                            <MobileItemCard
                                                key={branchDue.id}
                                                item={branchDue}
                                                fields={fields}
                                                status={branchStatusMap[branchDue.status]}
                                                actionLabel="View Dues"
                                                onActionClick={() => handleViewClick(branchDue)}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-center col-span-full text-gray-500 py-8">No branch dues found.</p>
                                    )}
                                </div>
                            }
                            <PaginationControls
                                total={tableData.length}
                                page={page}
                                onPageChange={setPage}
                                itemsPerPage={itemsPerPage}
                            />
                        </>
                    )}
                </>
            </div>

            {/* `SuccessfulEventCreation` dialog should be triggered immediately an event is created
                * Possibly by backend query since it requires the title of the event just created and can not
                * live within the add event page, it must be rendered here due to `useLocation`
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
                id={selected && selected?.id}
                onEdit={() => { }}
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