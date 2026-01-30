import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import DataTable from "./DataTable";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

type ResponsiveDataTableProps<T> = {
  data: T[];
  columns: any[];
  renderMobileItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
};

export function ResponsiveDataTable<T>({
  data,
  columns,
  renderMobileItem,
  itemsPerPage = 4,
}: ResponsiveDataTableProps<T>) {
  const isMedium = useMediaQuery("(max-width: 1250px)");
  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = data.slice(start, end);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {!isMedium ? (
        <DataTable table={table} />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {currentItems.map(renderMobileItem)}
          </div>
          {Math.ceil(data.length / itemsPerPage) > 1 && 
            <PaginationControls
              total={data.length}
              page={page}
              onPageChange={setPage}
              itemsPerPage={itemsPerPage}
            />
          }
        </>
      )}
    </>
  );
}
