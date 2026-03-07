import SectionHeader from "@/components/SectionHeader";
import { branchPaymentStatusMap, formatDate } from "@/utils/helpers";
import type { BranchPaymentsDataType, FieldConfig } from "@/utils/types";
import { useMediaQuery, Skeleton } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState, useCallback, useMemo } from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import ViewPayment from "./ViewPayment";
import DuesReminder from "./DuesReminder";
import { useBranchPayments } from "@/services/hooks/branch";

const sectionActions = [
    <button className="section-action-button">
        Filter
    </button>,
    <button className="section-action-button">
        2022
    </button>
]

export default function BranchPaymentsTab() {
    const [_query] = useState(""); // TODO: Remove underscore when search logic is implemented
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [showDuesReminder, setShowDuesReminder] = useState(false);
    const [selected, setSelected] = useState<BranchPaymentsDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);

    const { data: payments, isLoading } = useBranchPayments();

    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const tableData: BranchPaymentsDataType[] = useMemo(() =>
        payments?.map(p => ({
            id: p.id,
            memberName: p.user.fullName,
            date: "", // Not provided in list API
            title: p.transactionId,
            type: "Payment",
            amountPaidUsd: p.amountPaidUsd.toString(),
            status: p.status as BranchPaymentsDataType["status"]
        })) || [],
        [payments]
    );

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = tableData.slice(start, end);

    const handleViewClick = useCallback((payment: BranchPaymentsDataType) => {
        setSelected(payment);
        setViewOpen(true);
    }, []);

    const tableColumns = useMemo(
        () => columns(handleViewClick),
        [handleViewClick]
    );

    const table = useReactTable<BranchPaymentsDataType>({
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
    })

    const handleSearch = () => {
        // TODO: Implement search logic
    }

    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Branch Payments"
                    onSearch={handleSearch}
                    actions={sectionActions}
                    noTitle={!isLarge ? false : true}
                />
                <button
                    className="text-sm md:text-base py-3 px-2 md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
                    onClick={() => setShowDuesReminder(true)}
                >
                    Create Dues Reminder
                </button>
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
                            <div className="flex flex-col gap-4">
                                <DataTable
                                    table={table}
                                    pagination={false}
                                />
                                <div className="mt-4">
                                    <PaginationControls
                                        total={tableData.length}
                                        page={page}
                                        onPageChange={setPage}
                                        itemsPerPage={itemsPerPage}
                                        desktop={!isMedium}
                                    />
                                </div>
                            </div>
                            :

                            <div className="grid gap-4 md:grid-cols-2">
                                {currentItems.map((branchPayment: BranchPaymentsDataType) => {
                                    const normalizedStatus = branchPayment.status ? branchPayment.status.toLowerCase() : "";
                                    const statusConfig = branchPaymentStatusMap[normalizedStatus] || {
                                        label: branchPayment.status || "Unknown",
                                        labelColor: "#667085",
                                        dotColor: "#667085",
                                        bgColor: "#F2F4F7"
                                    };

                                    return (
                                        <MobileItemCard
                                            key={branchPayment.id}
                                            item={branchPayment}
                                            fields={fields}
                                            status={statusConfig}
                                            actionLabel="View Dues"
                                            onActionClick={() => { handleViewClick(branchPayment) }}
                                        />
                                    )
                                })}
                            </div>
                        }
                        {isMedium && tableData.length > 0 &&
                            <PaginationControls
                                total={tableData.length}
                                page={page}
                                onPageChange={setPage}
                                itemsPerPage={itemsPerPage}
                            />
                        }
                    </>
                )}
            </>
            <ViewPayment
                open={isViewOpen}
                onClose={() => setViewOpen(false)}
                payment={selected}
            />
            <DuesReminder
                open={showDuesReminder}
                onClose={() => setShowDuesReminder(false)}
            />
        </div>
    )
}

const fields: FieldConfig<BranchPaymentsDataType>[] = [
    {
        label: "Amount Paid",
        value: (p) => `N${p.amountPaidUsd}`
    },
    {
        label: "Transaction ID",
        value: (p) => p.title
    },
    {
        label: "Date",
        value: (p) => p.date ? formatDate(p.date) : "N/A"
    },
    {
        label: "Member Name",
        value: (p) => p.memberName
    }
]