import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, paymentStatusMap } from "@/utils/helpers";
import type { PaymentDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";

export const columns: ColumnDef<PaymentDataType>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<PaymentDataType> }) => <span>{formatDate(row.original.date)}</span>
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }: { row: Row<PaymentDataType> }) => <span>{row.original.category}</span>
    }, 
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: { row: Row<PaymentDataType> }) => <span>{row.original.description}</span>
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }: { row: Row<PaymentDataType> }) => {
            const { amountPaid } = row.original;
            return (
                <span>
                    {`N${(+amountPaid).toLocaleString()}`}
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue();

            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = paymentStatusMap[status as PaymentDataType["status"]];

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
        id: "action",
        header: "Action",
        size: 150,
        cell: () => (
            <p className="text-aciu-green-normal font-coolvetica cursor-pointer">
                Download Receipt
            </p>
        )
    }
]