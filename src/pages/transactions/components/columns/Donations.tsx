import { StatusBadge } from "@/components/StatusBadge";
import type { DonationsResponse } from "@/services/types/transactions";
import { paymentStatusMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const donationsColumns = (setSelected: (p: DonationsResponse) => void): ColumnDef<DonationsResponse>[] => [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        maxSize: 200,
        cell: ({ row }: { row: Row<DonationsResponse> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.transactionId}
            >
                {row.original.transactionId}
            </span>
        )
    },
    {
        accessorKey: "Donor Name",
        header: "Donor Name",
        cell: ({ row }: { row: Row<DonationsResponse> }) => <span className="inline-block lg:max-w-32 truncate" title={row.original["Donor Name"]}>{row.original["Donor Name"]}</span>
    },
    {
        accessorKey: "Date",
        header: "Date",
        cell: ({ row }: { row: Row<DonationsResponse> }) => <span>{formatDate(row.original.Date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "amountPaid",
        header: "Amount",
        cell: ({ row }: { row: Row<DonationsResponse> }) => <span>{`₦${(+row.original["Amount Paid"]).toLocaleString()}`}</span>
    },
    {
        accessorKey: "Status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue<DonationsResponse["Status"]>();
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = paymentStatusMap[status];

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
        cell: ({ row }: { row: Row<DonationsResponse>}) => (
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
