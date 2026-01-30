import { StatusBadge } from "@/components/StatusBadge";
import type { NationalDuesResponse } from "@/services/types/transactions";
import { nationalDuesMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const nationalDuesColumns = (setSelected: (p: NationalDuesResponse) => void): ColumnDef<NationalDuesResponse>[] => [
    {
        accessorKey: "Date",
        header: "Date",
        cell: ({ row }: { row: Row<NationalDuesResponse> }) => <span>{formatDate(row.original.Date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "Due Type",
        header: "Due Type",
        cell: ({ row }: { row: Row<NationalDuesResponse> }) => <span className="inline-block lg:max-w-32 truncate" title={row.original["Due Type"]}>{row.original["Due Type"]}</span>
    },
     {
        accessorKey: "Intervals",
        header: "Intervals",
        cell: ({ row }: { row: Row<NationalDuesResponse> }) => <span className="inline-block lg:max-w-32 truncate" title={row.original["Intervals"]}>{row.original.Intervals}</span>
    },
    {
        accessorKey: "Amount",
        header: "Amount Paid",
        cell: ({ row }: { row: Row<NationalDuesResponse> }) => <span>{`₦${Math.round(+row.original["Amount Paid"]).toLocaleString()}`}</span>
    },
    {
        accessorKey: "Status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue<string>();
            const normalised = status.toLowerCase() as NationalDuesResponse["Status"]
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = nationalDuesMap[normalised];

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
        cell: ({ row }: { row: Row<NationalDuesResponse>}) => (
            <button
                onClick={() => {
                    setSelected(row.original)
                }}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px]
                border border-aciu-green-normal min-w-fit whitespace-nowrap"
            >
                View Dues
            </button>
        )
    }
]
