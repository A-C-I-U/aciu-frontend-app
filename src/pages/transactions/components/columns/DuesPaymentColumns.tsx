import { StatusBadge } from "@/components/StatusBadge";
import type { DuesPaymentResponse } from "@/services/types/transactions";
import { duePaymentStatusMap } from "@/utils/helpers";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const duesPaymentcolumns = (setSelected: (p: DuesPaymentResponse) => void): ColumnDef<DuesPaymentResponse>[] => [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        maxSize: 200,
        cell: ({ row }: { row: Row<DuesPaymentResponse> }) => (
            <span 
                className="inline-block lg:max-w-50 truncate" 
                title={row.original.transactionId}
            >
                {row.original.transactionId}
            </span>
        )
    },
    {
        accessorKey: "paidBy",
        header: "Paid By",
        cell: ({ row }: { row: Row<DuesPaymentResponse> }) => <span className="inline-block lg:max-w-32 truncate" title={row.original.paidBy}>{row.original.paidBy}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<DuesPaymentResponse> }) => <span>{formatDate(row.original.date, "dd-MM-yyyy h:mm  aaaaa'm'")}</span>
    },
    {
        accessorKey: "amountPaid",
        header: "Amount",
        cell: ({ row }: { row: Row<DuesPaymentResponse> }) => <span>{`₦${(+row.original.amountPaid).toLocaleString()}`}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue<DuesPaymentResponse["status"]>();
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = duePaymentStatusMap[status];

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
        cell: ({ row }: { row: Row<DuesPaymentResponse>}) => (
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
