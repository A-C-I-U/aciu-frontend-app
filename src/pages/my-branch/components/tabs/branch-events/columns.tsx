import { StatusBadge } from "@/components/StatusBadge";
import { branchEventStatusMap } from "@/utils/helpers";
import type { BranchEventDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Link } from "react-router-dom";

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
        cell: ({ row }: { row: Row<BranchEventDataType> }) => <span>{formatDate(row.original.createdOn, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "registered",
        header: "Registered",
        cell: ({ row }: { row: Row<BranchEventDataType> }) => <span>{row.original.registered}</span>
    },
      {
            accessorKey: "verificationStatus",
            header: "Verification Status",
            maxSize: 200,
            cell: ({ getValue }) => {
                const status = getValue();
                const { 
                    label, 
                    labelColor, 
                    dotColor, 
                    bgColor 
                } = branchEventStatusMap[status as BranchEventDataType["verificationStatus"]];
    
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
        // TODO: Remove `pointer-events-none` when integrating
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }: { row: Row<BranchEventDataType>}) => (
                <Link
                    to={`/events/${row.original.id}`}
                    className="p-2 text-sm font-coolvetica 
                    text-aciu-green-normal rounded-[5px]
                    border border-aciu-green-normal min-w-fit whitespace-nowrap pointer-events-none"
                >
                    View Details
                </Link>
            )
        }
]