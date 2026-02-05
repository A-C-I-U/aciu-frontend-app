import { StatusBadge } from "@/components/StatusBadge";
import { branchPaymentStatusMap } from "@/utils/helpers";
import type { BranchPaymentsDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const columns = (setSelected: (p: BranchPaymentsDataType) => void): ColumnDef<BranchPaymentsDataType>[] => [
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
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{formatDate(row.original.date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
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
                } = branchPaymentStatusMap[status as BranchPaymentsDataType["status"]];
    
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
            cell: ({ row }: { row: Row<BranchPaymentsDataType>}) => (
                <button
                    onClick={() => setSelected(row.original)}
                    className="p-2 text-sm font-coolvetica 
                    text-aciu-green-normal rounded-[5px]
                    border border-aciu-green-normal min-w-fit whitespace-nowrap"
                >
                    View Dues
                </button>
            )
        }
]