import { StatusBadge } from "@/components/StatusBadge";
import type { WithdrawalResponse } from "@/services/types/transactions";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const transactionsWithdrawalColumns = (setSelected: (p: WithdrawalResponse) => void): ColumnDef<WithdrawalResponse>[] => [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        maxSize: 200,
        cell: ({ row }: { row: Row<WithdrawalResponse> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.transactionId}
            >
                {row.original.transactionId}
            </span>
        )
    },
    {
        accessorKey: "Branch Name",
        header: "Branch Name",
        cell: ({ row }: { row: Row<WithdrawalResponse> }) => <span className="inline-block lg:max-w-32 truncate" title={row.original["Branch Name"]}>{row.original["Branch Name"]}</span>
    },
    {
        accessorKey: "Date",
        header: "Date",
        cell: ({ row }: { row: Row<WithdrawalResponse> }) => <span>{formatDate(row.original.Date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: { row: Row<WithdrawalResponse> }) => <span>{`₦${(+row.original["Amount Paid"]).toLocaleString()}`}</span>
    },
    {
        accessorKey: "Status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const rawStatus = getValue<string>();
            const normalized = rawStatus.toLowerCase() as WithdrawalResponse["Status"];
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = withdrawalStatusMap[normalized];

            return (
                <StatusBadge
                    label={label}
                    labelColor={labelColor}
                    bgColor={bgColor}
                    dotColor={dotColor}
                />
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 150,
        cell: ({ row }: { row: Row<WithdrawalResponse>}) => (
            <button
                onClick={() => {
                    setSelected(row.original)
                }}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px]
                border border-aciu-green-normal min-w-fit whitespace-nowrap"
            >
                View Details
            </button>
        )
    }
]
