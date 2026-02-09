import { StatusBadge } from "@/components/StatusBadge";
import { branchEventStatusMap } from "@/utils/helpers";
import type { Event } from "@/services/types/events";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: "title",
        header: "Event Title",
        cell: ({ row }: { row: Row<Event> }) => <span>{row.original.title}</span>
    },
    {
        accessorKey: "createdBy",
        header: "Created by",
        cell: ({ row }: { row: Row<Event> }) => <span>{row.original.createdBy}</span>
    },
    {
        accessorKey: "eventDate",
        header: "Event Date",
        cell: ({ row }: { row: Row<Event> }) => <span>{format(new Date(row.original.eventDate), "dd-MM-yyyy")}</span>
    },
    {
        accessorKey: "registeredCount",
        header: "Registered",
        cell: ({ row }: { row: Row<Event> }) => <span>{row.original.registeredCount}</span>
    },
    {
        accessorKey: "verificationStatus",
        header: "Verification Status",
        maxSize: 200,
        cell: ({ getValue }) => {
            const status = (getValue() as string)?.toLowerCase();
            const config = branchEventStatusMap[status as keyof typeof branchEventStatusMap] || branchEventStatusMap["completed"];
            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = config;

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
        cell: ({ row }: { row: Row<Event> }) => (
            <Link
                to={`/events/${row.original.id}`}
                className="p-2 text-sm font-coolvetica 
                    text-aciu-green-normal rounded-[5px]
                    border border-aciu-green-normal min-w-fit whitespace-nowrap"
            >
                View Details
            </Link>
        )
    }
]