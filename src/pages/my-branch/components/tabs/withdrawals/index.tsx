import { formatDate, generateMockWithdrawals, withdrawalStatusMap } from "@/utils/helpers";
import type { FieldConfig, WithdrawalDataType } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react"
import { columns } from "./columns";
import SectionHeader from "@/components/SectionHeader";
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import ViewWithdrawalRequest from "./ViewWithdrawalRequest";
import SubmitWithdrawalRequest from "./SubmitWithdrawalRequest";
import SuccessfulRequest from "./SuccessfulRequest";

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
    const [showSubmitRequest, setShowSubmitRequest] = useState(false);
    const [selected, setSelected] = useState<WithdrawalDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [isSuccessOpen, setSuccessOpen] = useState(false);

    // Separated open state from selected to allow proper exit and entry animations
    // Using !!selected as open={!!selected} caused instant mounting and unmounting
    const handleViewClick = (withdrawal: WithdrawalDataType) => {
        setSelected(withdrawal);
        setViewOpen(true)
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const table = useReactTable<WithdrawalDataType>({
        data: mockData,
        columns: columns(handleViewClick),
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title={!isMedium ? "Withdrawals" : ""}
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                        noTitle={!isMedium ? false : true}
                    />
                    <button 
                        className="btn btn-primary max-w-fit !text-sm md:text-base!"
                        onClick={() => setShowSubmitRequest(true)}
                    >
                        Submit Withdrawal Request
                    </button>
                </div>

                <>
                    {!isMedium ?
                        <DataTable
                            table={table}
                        />
                        :
                        
                        <div className="grid gap-4 md:grid-cols-2">
                            {currentItems.map((withdrawal: WithdrawalDataType) => (
                                <MobileItemCard
                                    key={withdrawal.id}
                                    item={withdrawal}
                                    fields={fields}
                                    status={withdrawalStatusMap[withdrawal.status]}
                                    actionLabel="View Dues"
                                    onActionClick={() => handleViewClick(withdrawal)}
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

const mockData = generateMockWithdrawals(20);

const fields: FieldConfig<WithdrawalDataType>[] = [
    {
        label: "Amount",
        value: (p) => `N${(+p.amount).toLocaleString()}`,
    },
    {
        label: "Transaction ID",
        value: (p) => p.id
    },
    {
        label: "Date",
        value: (p) => formatDate(p.date)
    },
    {
        label: "Submitted by",
        value: (p) => p.submittedBy
    }
]