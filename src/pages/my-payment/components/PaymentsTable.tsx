import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { columns } from "./dues-breakdown/columns";
import { donationColumns } from "./donations/columns";
import MobilePaymentItem from "./MobilePaymentItem";
import DataTable from "@/components/DataTable";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import type { Payment } from "@/services/types/mypayments";

interface PaymentsTableProps {
  payments: Payment[];
  isLoading?: boolean;
  error?: Error | null;
  paymentType: "DUE" | "DONATION";
}

export default function PaymentsTable({
  payments,
  isLoading,
  error,
  paymentType,
}: PaymentsTableProps) {
  const isMedium = useMediaQuery("(max-width:1250px)");
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = payments.slice(start, end);

  const tableColumns = paymentType === "DUE" ? columns : donationColumns;

  const table = useReactTable<Payment>({
    data: payments,
    columns: tableColumns as any,
    pageCount: Math.ceil(payments.length / 10),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading payments: {error.message}</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-600">No payments found</p>
      </div>
    );
  }

  return (
    <>
      {!isMedium ? (
        <DataTable table={table} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {currentItems.map((payment, index) => (
            <MobilePaymentItem
              key={`${payment.type}-${payment.date}-${index}`}
              payment={payment}
              paymentType={paymentType}
            />
          ))}
        </div>
      )}
      {isMedium && (
        <PaginationControls
          total={payments.length}
          page={page}
          onPageChange={setPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
}
