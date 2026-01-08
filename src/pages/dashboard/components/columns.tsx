import { StatusBadge } from "@/components/StatusBadge";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";


export const columns = (setSelected: (p: WithdrawalDataType) => void): ColumnDef<WithdrawalDataType>[] => [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        maxSize: 200,
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => (
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
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span className="inline-block lg:max-w-32 truncate" title={row.original.branchName}>{row.original.branchName}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span>{formatDate(row.original.date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span>{`₦${(+row.original.amount).toLocaleString()}`}</span>
    },
        {
            accessorKey: "status",
            header: "Status",
            maxSize: 300,
            cell: ({ getValue }) => {
                const status = getValue();
                const { 
                    label, 
                    labelColor, 
                    dotColor, 
                    bgColor 
                } = withdrawalStatusMap[status as WithdrawalDataType["status"]];
    
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
            cell: ({ row }: { row: Row<WithdrawalDataType>}) => (
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