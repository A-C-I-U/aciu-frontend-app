import { formatDate, withdrawalStatusMap } from "@/utils/helpers";
import type { FieldConfig, WithdrawalDataType } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react"
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import { Link } from "react-router-dom";
import WithdrawalDetail from "./WithdrawalDetail";
import { Sort } from "iconsax-react";

export default function WithdrawalRequestsTable({
    data, columns
}: { data: any, columns: (dataItem: any) => any[]}) {
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [selected, setSelected] = useState<WithdrawalDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);


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
    const currentItems = data.slice(start, end);

    const table = useReactTable<WithdrawalDataType>({
        data: data,
        columns: columns(handleViewClick),
        pageCount: Math.ceil(data?.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between lg:items-center">
                    <h5 className="text-lg lg:text-xl line-height-120 text-aciu-border-grey">
                        Withdrawal Requests
                    </h5>
                    <div className="flex items-center gap-4">
                        <button className="section-action-button">
                            Filter
                            <Sort size={20} color="#A4ACB9" />
                        </button>
                        <Link
                            className="btn btn-primary max-w-fit !text-sm md:text-base!"
                            to="/transactions"
                        >
                            View All Transactions
                        </Link>
                    </div>
                    
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
                            total={data.length}
                            page={page}
                            onPageChange={setPage}
                            itemsPerPage={itemsPerPage}
                        />
                    }
                </>
            </div>

            <WithdrawalDetail
                open={isViewOpen}
                onClose={handleViewClose}
                withdrawalId={selected && selected.id}
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
        value: (p) => formatDate(p.date)
    },
    {
        label: "Branch Name",
        value: (p) => p.branchName
    }
]