import { StatusBadge } from "@/components/StatusBadge";
import type { AgeGrade } from "@/services/types/database";
import type { StatusMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";


export const ageGradeColumns = (setSelected: (p: AgeGrade) => void): ColumnDef<AgeGrade>[] => [
    {
        accessorKey: "name",
        header: "Name",
        maxSize: 200,
        cell: ({ row }: { row: Row<AgeGrade> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.name}
            >
                {row.original.name}
            </span>
        )
    },
    {
        accessorKey: "yearFormed",
        header: "Year Formed",
        cell: ({ row }: { row: Row<AgeGrade> }) => <span>{row.original.yearFormed}</span>
    }, 
    {
        accessorKey: "members",
        header: "Members",
        cell: ({ row }: { row: Row<AgeGrade> }) => <span>{`${row.original.members} Members`}</span>
    },
    {
        accessorKey: "associatedBranches",
        header: "Associated Branch(es)",
        cell: ({ row }: { row: Row<AgeGrade> }) => <span>{`${row.original.associatedBranches} Branches`}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<AgeGrade["status"]>();
            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = ageGradeStatusMap[status]

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
        cell: ({ row }: { row: Row<AgeGrade>}) => (
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

export const ageGradeStatusMap: Record<AgeGrade["status"], StatusMap> = {
    Active: { 
        label: "Active", 
        labelColor: "#027A48", 
        dotColor: "#12B76A", 
        bgColor: "#ECFDF3" 
    },
    Inactive: {
        label: "Inactive",
        labelColor: "#3E3E3E",
        dotColor: "#3E3E3E",
        bgColor: "#E5E5E5"
    },
}