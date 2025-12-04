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

    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const table = useReactTable<WithdrawalDataType>({
        data: mockData,
        columns: columns(setSelected),
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <>
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Withdrawals"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                <button 
                    className="text-sm md:text-base py-3 px-2 md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
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
                                onActionClick={() => setSelected(withdrawal)}
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
        {selected && (
            <ViewWithdrawalRequest
                open={!!selected}
                onClose={() => setSelected(null)}
                withdrawal={selected}
            />
        )}
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