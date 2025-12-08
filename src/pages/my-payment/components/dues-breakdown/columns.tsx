import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, getPaymentStatusConfig } from "@/utils/helpers";
import type { Payment } from "@/services/types/mypayments";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{formatDate(row.original.date)}</span>
    },
    {
        accessorKey: "dueType",
        header: "Due Type",
        cell: ({ row }) => <span>{row.original.dueType || 'N/A'}</span>
    }, 
    {
        accessorKey: "period",
        header: "Period",
        cell: ({ row }) => <span>{row.original.period || 'N/A'}</span>
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }) => {
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
            const status = getValue() as string;
            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = getPaymentStatusConfig(status);

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
];