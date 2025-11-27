import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, paymentStatusMap } from "@/utils/helpers";
import type { BranchEventDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";

export const columns: ColumnDef<BranchEventDataType>[] = [
    {
        accessorKey: "eventTitle",
        header: "Event Title",
        cell: ({ row }: { row: Row<BranchEventDataType> }) => <span>{row.original.eventTitle}</span>
    },
        {
        accessorKey: "createdBy",
        header: "Created by",
        cell: ({ row }: { row: Row<BranchEventDataType> }) => <span>{row.original.createdBy}</span>
    },
    {
        accessorKey: "createdOn",
        header: "Created on",
        cell: ({ row }: { row: Row<BranchEventDataType> }) => <span>{formatDate(row.original.createdOn)}</span>
    },
    {
        accessorKey: "registered",
        header: "Registered",
        cell: ({ row }: { row: Row<BranchEventDataType> }) => <span>{`N${(+row.original.registered).toLocaleString()}`}</span>
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
                } = paymentStatusMap[status as BranchEventDataType["verificationStatus"]];
    
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
                    View Details
                </button>
            )
        }
]