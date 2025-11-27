import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, paymentStatusMap } from "@/utils/helpers";
import type { BranchPaymentsDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";

export const columns: ColumnDef<BranchPaymentsDataType>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{row.original.id}</span>
    },
        {
        accessorKey: "memberName",
        header: "Member Name",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{row.original.memberName}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{formatDate(row.original.date)}</span>
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{`N${(+row.original.amountPaid).toLocaleString()}`}</span>
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
                } = paymentStatusMap[status as BranchPaymentsDataType["status"]];
    
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
            cell: () => (
                <button
                    className="p-2 text-sm font-coolvetica 
                    text-aciu-green-normal rounded-[5px]
                    border border-aciu-green-normal min-w-fit whitespace-nowrap"
                >
                    View Dues
                </button>
            )
        }
]