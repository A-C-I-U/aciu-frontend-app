import { StatusBadge } from "@/components/StatusBadge";
import { branchPaymentStatusMap } from "@/utils/helpers";
import type { BranchPaymentsDataType } from "@/utils/types";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const columns = (setSelected: (p: BranchPaymentsDataType) => void): ColumnDef<BranchPaymentsDataType>[] => [
    {
        accessorKey: "id",
        header: "Transaction ID",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{row.original.title}</span>
    },
    {
        accessorKey: "memberName",
        header: "Member Name",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{row.original.memberName}</span>
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => {
            const date = row.original.date;
            if (!date) return <span>N/A</span>;
            try {
                return <span>{formatDate(date, "dd-MM-yyyy h:mm aaaaa'm'")}</span>
            } catch {
                return <span>N/A</span>
            }
        }
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => <span>{`N${(+row.original.amountPaidUsd).toLocaleString()}`}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue() as string;
            const normalizedStatus = status ? status.toLowerCase() : "";
            const config = branchPaymentStatusMap[normalizedStatus] || {
                label: status || "Unknown",
                labelColor: "#667085",
                dotColor: "#667085",
                bgColor: "#F2F4F7"
            };

            const {
                label,
                labelColor,
                dotColor,
                bgColor
            } = config;

            return (
                <StatusBadge
                    label={label}
                    labelColor={labelColor}
                    bgColor={bgColor}
                    dotColor={dotColor}
                />
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        size: 150,
        cell: ({ row }: { row: Row<BranchPaymentsDataType> }) => (
            <button
                onClick={() => setSelected(row.original)}
                className="p-2 text-sm font-coolvetica 
                    text-aciu-green-normal rounded-[5px]
                    border border-aciu-green-normal min-w-fit whitespace-nowrap"
            >
                View Dues
            </button>
        )
    }
];