import { StatusBadge } from "@/components/StatusBadge";
import type { Payment } from "@/services/types/mypayments";
import { formatDate, getPaymentStatusConfig } from "@/utils/helpers";
import type { ColumnDef } from "@tanstack/react-table";

export const donationColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span>{formatDate(row.original.date)}</span>
    },
    {
        accessorKey: "targetType",
        header: "Target Type",
        cell: ({ row }) => <span>{row.original.targetType || 'N/A'}</span>
    }, 
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <span>{row.original.description || 'No description'}</span>
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