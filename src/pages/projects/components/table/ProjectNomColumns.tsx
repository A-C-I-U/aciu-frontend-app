import { StatusBadge } from "@/components/StatusBadge";
import type { NominatedProject } from "@/services/types/projects";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const columns = (setSelected: (p: NominatedProject) => void): ColumnDef<NominatedProject>[] => [
    {
        accessorKey: "projectId",
        header: "Project ID",
        maxSize: 200,
        cell: ({ row }: { row: Row<NominatedProject> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.projectId}
            >
                {row.original.projectId}
            </span>
        )
    },
    {
        accessorKey: "submittedBy",
        header: "Submitted By",
        cell: ({ row }: { row: Row<NominatedProject> }) => <span title={row.original.submittedBy}>{row.original.submittedBy}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<NominatedProject> }) => <span>{formatDate(row.original.date, "dd-MM-yyyy h:mm a")}</span>
    },
    // Commenting out because backend is not returning estimated cost on this endpoint for now
    // {
    //     accessorKey: "estimatedCostUSD",
    //     header: "Estimated Cost",
    //     cell: ({ row }: { row: Row<NominatedProject> }) => <span>{row.original.estimatedCost}</span>
    // },
    {
        accessorKey: "status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue() as string;
            
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = withdrawalStatusMap[status.toLocaleLowerCase() as WithdrawalDataType["status"]];

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
        cell: ({ row }: { row: Row<NominatedProject>}) => (
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