import { StatusBadge } from "@/components/StatusBadge";
import { branchMemberStatusMap } from "@/utils/helpers";
import type { BranchMemberDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";


export const columns = (setSelected: (p: BranchMemberDataType) => void): ColumnDef<BranchMemberDataType>[] => [
    {
        accessorKey: "fullName",
        header: "Full name",
        cell: ({ row }: { row: Row<BranchMemberDataType> }) => <span>{row.original.fullName}</span>
    },
    {
        accessorKey: "ageGrade",
        header: "Age Grade",
        cell: ({ row }: { row: Row<BranchMemberDataType> }) => <span>{row.original.ageGrade}</span>
    },
    {
        accessorKey: "joinedOn",
        header: "Joined On",
        cell: ({ row }: { row: Row<BranchMemberDataType> }) => {
            try {
                return <span>{formatDate(new Date(row.original.joinedOn), "dd-MM-yyyy h:mm aaaaa'm'")}</span>;
            } catch {
                return <span>N/A</span>;
            }
        }
    },
    {
        accessorKey: "occupation",
        header: "Occupation",
        cell: ({ row }: { row: Row<BranchMemberDataType> }) => <span>{row.original.occupation}</span>
    },
    {
        accessorKey: "verificationStatus",
        header: "Verfication Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue();
            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = branchMemberStatusMap[status as BranchMemberDataType["verificationStatus"]];

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
        cell: ({ row }: { row: Row<BranchMemberDataType> }) => (
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