import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";


export const columns = (setSelected: (p: WithdrawalDataType) => void): ColumnDef<WithdrawalDataType>[] => [
    {
        accessorKey: "id",
        header: "Transaction ID",
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span>{row.original.id}</span>
    },
    {
        accessorKey: "submittedBy",
        header: "Submitted by",
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span>{row.original.submittedBy}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span>{formatDate(row.original.date)}</span>
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: { row: Row<WithdrawalDataType> }) => <span>{`N${(+row.original.amount).toLocaleString()}`}</span>
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