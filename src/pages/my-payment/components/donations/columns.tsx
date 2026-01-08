import { StatusBadge } from "@/components/StatusBadge";
import type { Payment } from "@/services/types/mypayments";
import { formatDate, getPaymentStatusConfig } from "@/utils/helpers";
import type { ColumnDef } from "@tanstack/react-table";

export const donationColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "targetType",
    header: "Target Type",
    cell: ({ row }) => <span>{row.original.targetType || "N/A"}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span>{row.original.description || "No description"}</span>
    ),
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => {
      const { amountPaid } = row.original;
      return (
        <span>
          {" "}
          {amountPaid == null
            ? "N/A"
            : `N${Number(amountPaid).toLocaleString()}`}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const { label, labelColor, dotColor, bgColor } =
        getPaymentStatusConfig(status);

      return (
        <StatusBadge
          label={label}
          labelColor={labelColor}
          bgColor={bgColor}
          dotColor={dotColor}
        />
      );
    },
  },
  {
    id: "action",
    header: "Action",
    size: 150,
    cell: ({ row }) => {
      const { status, id } = row.original;
      const statusConfig = getPaymentStatusConfig(status);

      const handleAction = () => {
        switch (statusConfig.action) {
          case "download":
            // Handle download receipt
            console.log("Download receipt for donation:", id);
            break;
          case "pay":
            // Handle pay now
            console.log("Pay now for donation:", id);
            break;
          case "retry":
            // Handle retry payment
            console.log("Retry payment for donation:", id);
            break;
          default:
            break;
        }
      };

      if (!statusConfig.action) {
        return <span className="text-grayscale-60">-</span>;
      }

      return (
        <button
          onClick={handleAction}
          className={`text-sm font-medium cursor-pointer transition-colors ${
            statusConfig.action === "download"
              ? "text-aciu-green-normal hover:text-aciu-green-dark"
              : statusConfig.action === "pay"
              ? "text-aciu-green-normal hover:text-aciu-green-dark"
              : "text-aciu-green-normal hover:text-aciu-green-dark"
          }`}
        >
          {statusConfig.action === "download" && "Download Receipt"}
          {statusConfig.action === "pay" && "Pay Now"}
          {statusConfig.action === "retry" && "Retry Now"}
        </button>
      );
    },
  },
];
