import SectionHeader from "@/components/SectionHeader";
import { formatDate, generateMockBranchPayments, paymentStatusMap } from "@/utils/helpers";
import type { BranchPaymentsDataType, FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import ViewPayment from "./ViewPayment";
import DuesReminder from "./DuesReminder";

const sectionActions = [
    <button className="section-action-button">
        Filter
    </button>,
    <button className="section-action-button">
        2022
    </button>
]

export default function BranchPaymentsTab() {
    const [_query, setQuery] = useState(""); // TODO: Remove underscore when search logic is implemented
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [showDuesReminder, setShowDuesReminder] = useState(false);
    const [selected, setSelected] = useState<BranchPaymentsDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);

    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const handleViewClick = (payment: BranchPaymentsDataType) => {
        setSelected(payment);
        setViewOpen(true);
    }

    const table = useReactTable<BranchPaymentsDataType>({
        data: mockData,
        columns: columns(handleViewClick),
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    const handleSearch = (q: string) => {
        setQuery(q)
    }
    
    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} flex-wrap gap-y-2 md:gap-4`}>
                <SectionHeader
                    title={!isMedium ? "Branch Payments" : ""}
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                    noTitle={!isMedium ? false : true}
                />
                <button 
                    className="text-sm md:text-base py-3 px-2 md:py-4 md:px-2 gap-2 text-white font-coolvetica bg-aciu-green-normal whitespace-nowrap w-fit rounded-xl"
                    onClick={() => setShowDuesReminder(true)}
                >
                    Send Dues Reminder
                </button>
            </div>

            <>
                {!isMedium ?
                    <DataTable 
                        table={table}
                    />
                    :
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        {currentItems.map((branchPayment: BranchPaymentsDataType) => (
                            <MobileItemCard
                                key={branchPayment.id}
                                item={branchPayment}
                                fields={fields}
                                status={paymentStatusMap[branchPayment.status]}
                                actionLabel="View Dues"
                                onActionClick={() => {handleViewClick(branchPayment)}}
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

const mockData = generateMockBranchPayments(20);
const fields: FieldConfig<BranchPaymentsDataType>[] = [
    {
        label: "Amount Paid",
        value: (p) => `N${(+p.amountPaid).toLocaleString()}`,
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
        label: "Member Name",
        value: (p) => p.memberName
    }
]