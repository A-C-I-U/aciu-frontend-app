import { formatDate, withdrawalStatusMap } from "@/utils/helpers";
import type { FieldConfig, WithdrawalDataType } from "@/utils/types";
import { useMediaQuery, Skeleton } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState, useCallback, useMemo } from "react";
import { columns } from "./columns";
import SectionHeader from "@/components/SectionHeader";
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import ViewWithdrawalRequest from "./ViewWithdrawalRequest";
import SubmitWithdrawalRequest from "./SubmitWithdrawalRequest";
import SuccessfulRequest from "./SuccessfulRequest";
import { useBranchWithdrawals } from "@/services/hooks/branch";

const sectionActions = [
    <button className="section-action-button">
        Filter
    </button>,
    <button className="section-action-button">
        2022
    </button>
]

export default function WithdrawalTab() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [showSubmitRequest, setShowSubmitRequest] = useState(false);
    const [selected, setSelected] = useState<WithdrawalDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [isSuccessOpen, setSuccessOpen] = useState(false);

    const { data: withdrawals, isLoading } = useBranchWithdrawals();

    // transformed data
    const tableData: WithdrawalDataType[] = useMemo(() =>
        withdrawals?.map(w => ({
            id: w.id,
            transactionId: w.transactionId,
            submittedBy: w.User["Submitted By"],
            branchName: "", // Not in API
            reasons: "", // Not in API
            type: "Withdrawal",
            title: w.transactionId,
            date: w.Date,
            amount: w.amount.toString(),
            source: "", // Not in API
            status: w.status.toLowerCase() as WithdrawalDataType["status"]
        })) || [],
        [withdrawals]
    );

    const handleViewClick = useCallback((withdrawal: WithdrawalDataType) => {
        setSelected(withdrawal);
        setViewOpen(true);
    }, []);

    const handleViewClose = useCallback(() => {
        setViewOpen(false);
    }, []);

    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = tableData.slice(start, end);

    const tableColumns = useMemo(
        () => columns(handleViewClick),
        [handleViewClick]
    );

    const table = useReactTable<WithdrawalDataType>({
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

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title={!isLarge ? "Withdrawals" : ""}
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                        noTitle={!isLarge ? false : true}
                    />
                    <button
                        className="btn btn-primary max-w-fit !text-sm md:text-base!"
                        onClick={() => setShowSubmitRequest(true)}
                    >
                        Submit Withdrawal Request
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
                                    {currentItems.map((withdrawal: WithdrawalDataType) => {
                                        const normalizedStatus = withdrawal.status ? withdrawal.status.toLowerCase() : "";
                                        const statusConfig = (withdrawalStatusMap as any)[normalizedStatus] || {
                                            label: withdrawal.status || "Unknown",
                                            labelColor: "#667085",
                                            dotColor: "#667085",
                                            bgColor: "#F2F4F7"
                                        };

                                        return (
                                            <MobileItemCard
                                                key={withdrawal.id}
                                                item={withdrawal}
                                                fields={fields}
                                                status={statusConfig}
                                                actionLabel="View Details"
                                                onActionClick={() => handleViewClick(withdrawal)}
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
            </div>

            <ViewWithdrawalRequest
                open={isViewOpen}
                onClose={handleViewClose}
                withdrawal={selected}
            />

            <SubmitWithdrawalRequest
                open={showSubmitRequest}
                onClose={() => setShowSubmitRequest(false)}
                onSuccess={() => setSuccessOpen(true)}
            />

            <SuccessfulRequest
                open={isSuccessOpen}
                onClose={() => setSuccessOpen(true)}
            />
        </>
    )

}

const fields: FieldConfig<WithdrawalDataType>[] = [
    {
        label: "Amount",
        value: (p) => `N${(+p.amount).toLocaleString()}`,
    },
    {
        label: "Transaction ID",
        value: (p) => p.transactionId
    },
    {
        label: "Date",
        value: (p) => p.date ? formatDate(p.date) : "N/A"
    },
    {
        label: "Submitted by",
        value: (p) => p.submittedBy
    }
]