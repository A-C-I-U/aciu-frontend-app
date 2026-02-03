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
        cell: ({ row }: { row: Row<BranchMemberDataType> }) => <span>{formatDate(row.original.joinedOn, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
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
                    className="p-2 text-sm font-coolvetica 
                    text-aciu-green-normal rounded-[5px]
                    border border-aciu-green-normal min-w-fit whitespace-nowrap"
                >
                    View Details
                </button>
            )
            }
        
]