import { generateMockPayment } from "@/utils/helpers";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { columns } from "./dues-breakdown/columns";
import MobilePaymentItem from "./MobilePaymentItem";
import type { PaymentDataType } from "@/utils/types";
import DataTable from "@/components/DataTable";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";

export default function PaymentsTable() {
    const isMedium = useMediaQuery('(max-width:1250px)');
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const table = useReactTable<PaymentDataType>({
        data: mockData,
        columns,
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <>
            {!isMedium ?
                <DataTable 
                    table={table}
                />
                :
               
                <div className="grid gap-4 md:grid-cols-2">
                    {currentItems.map((payment: PaymentDataType) => (
                        <MobilePaymentItem
                            key={payment.id}
                            payment={payment}
                        />
                    ))}
                </div>
                }
            {isMedium &&
                <PaginationControls
                    total={mockData.length}
                    page={page}
                    onPageChange={setPage}
                    itemsPerPage={itemsPerPage}
                />
            }
        </>
    )
}


const mockData: PaymentDataType[] = generateMockPayment(20)