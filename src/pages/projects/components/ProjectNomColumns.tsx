import { StatusBadge } from "@/components/StatusBadge";
import type { ProjectNominationDetail } from "@/services/types/projects";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const columns = (setSelected: (p: ProjectNominationDetail) => void): ColumnDef<ProjectNominationDetail>[] => [
    {
        accessorKey: "projectId",
        header: "Project ID",
        maxSize: 200,
        cell: ({ row }: { row: Row<ProjectNominationDetail> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.id}
            >
                {row.original.id}
            </span>
        )
    },
    {
        accessorKey: "submittedBy",
        header: "Submitted By",
        cell: ({ row }: { row: Row<ProjectNominationDetail> }) => <span title={row.original.submittedBy}>{row.original.submittedBy}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<ProjectNominationDetail> }) => <span>{formatDate(row.original.date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "estimatedCostUSD",
        header: "Estimated Cost",
        cell: ({ row }: { row: Row<ProjectNominationDetail> }) => <span>{`₦${(+row.original.estimatedCostUSD).toLocaleString()}`}</span>
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
            } = withdrawalStatusMap[status as WithdrawalDataType["status"]];

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
        cell: ({ row }: { row: Row<ProjectNominationDetail>}) => (
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