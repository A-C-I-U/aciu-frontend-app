import { StatusBadge } from "@/components/StatusBadge";
import type { Member } from "@/services/types/database";
import { databaseMemberStatusMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const memberColumns = (setSelected: (p: Member) => void): ColumnDef<Member>[] => [
    {
        accessorKey: "fullName",
        header: "Full Name",
        maxSize: 200,
        cell: ({ row }: { row: Row<Member> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.fullName}
            >
                {row.original.fullName}
            </span>
        )
    },
    {
        accessorKey: "ageGrade",
        header: "Age Grade",
        cell: ({ row }: { row: Row<Member> }) => <span>{row.original.ageGrade}</span>
    },
    {
        accessorKey: "joinedOn",
        header: "Joined On",
        cell: ({ row }: { row: Row<Member> }) => <span>{formatDate(row.original.joinedOn, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    }, 
    {
        accessorKey: "occupation",
        header: "Occupation",
        cell: ({ row }: { row: Row<Member> }) => <span>{row.original.occupation}</span>
    },
    {
        accessorKey: "verificationStatus",
        header: "Verification Status",
        cell: ({ getValue }) => {
            const status = getValue<Member["verificationStatus"]>();
            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = databaseMemberStatusMap[status ? 'approved' : 'pending']

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
        cell: ({ row }: { row: Row<Member>}) => (
            <button
                onClick={() => {
                    setSelected(row.original)
                }}
                className="btn-custom"
            >
                View Details
            </button>
        )
    }
]