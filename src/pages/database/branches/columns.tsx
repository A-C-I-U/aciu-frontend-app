import { StatusBadge } from "@/components/StatusBadge";
import type { Branch } from "@/services/types/database";
import { branchStatusMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";


export const branchColumns = (setSelected: (p: Branch) => void): ColumnDef<Branch>[] => [
    {
        accessorKey: "branchName",
        header: "Branch Name",
        maxSize: 200,
        cell: ({ row }: { row: Row<Branch> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.branchName}
            >
                {row.original.branchName}
            </span>
        )
    },
    {
        accessorKey: "branchPresident",
        header: "Branch President",
        cell: ({ row }: { row: Row<Branch> }) => <span>{row.original.branchPresident}</span>
    }, 
    {
        accessorKey: "meetingLocation",
        header: "Meeting Location",
        cell: ({ row }: { row: Row<Branch> }) => <span>{row.original.meetingLocation}</span>
    },
    {
        accessorKey: "branchMembers",
        header: "Branch Members",
        cell: ({ row }: { row: Row<Branch> }) => <span>{`${row.original.branchMembers} Members`}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<Branch["status"]>();
            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = branchStatusMap[status]

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
        cell: ({ row }: { row: Row<Branch>}) => (
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