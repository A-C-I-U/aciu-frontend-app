import type { ColumnDef, Row } from "@tanstack/react-table";
import { branchStatusMap, formatDate } from "@/utils/helpers";
import { StatusBadge } from "@/components/StatusBadge";
import type { BranchDueDataType } from "@/utils/types";

export const columns: ColumnDef<BranchDueDataType>[] = [
    {
        accessorKey: "creationDate",
        header: "Date",
        cell: ({ row }: { row: Row<BranchDueDataType> }) => <span>{formatDate(row.original.creationDate)}</span>
    },
    {
        accessorKey: "dueType",
        header: "Due Type",
        cell: ({ row }: { row: Row<BranchDueDataType> }) => <span>{row.original.dueType}</span>
    },
    {
        accessorKey: "intervals",
        header: "Intervals",
        cell: ({ row }: { row: Row<BranchDueDataType> }) => <span className="capitalize">{row.original.intervals}</span>
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }: { row: Row<BranchDueDataType> }) => <span>{`N${(+row.original.amountPaid).toLocaleString()}`}</span>
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
            } = branchStatusMap[status as BranchDueDataType["status"]];

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