import React, { useMemo, useState } from "react"
import { 
    Checkbox, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow 
} from "@mui/material";
import { 
    flexRender,
    getCoreRowModel, 
    getPaginationRowModel, 
    useReactTable, 
    type Row, 
    type Table as TableType
} from "@tanstack/react-table";
import { 
    ArrowLeftIcon, 
    ArrowRightIcon, 
    CheckIcon, 
    MinusIcon 
} from "lucide-react";
import { Pagination } from "@heroui/react";



export default function DataTable({ 
    columns, 
    data, 
    withSelection 
}: { 
    columns: any, 
    data: any, 
    withSelection?: boolean 
}) {

    const [rowSelection, setRowSelection] = useState({});

    const memoizedColumns = useMemo(() => {
        const base = [...columns];

        if (withSelection) {
            base.unshift({
                id: "select",
                header: ({ table }: { table: TableType<any>}) => (
                    <Checkbox
                        icon={
                            <span className="w-4 h-4 border border-aciu-gray-light rounded-[6px]" />
                        }
                        sx={{
                            color: "none",
                            '& .MuiSvgIcon-root': {
                                color: "none"
                            }
                        }}
                        checkedIcon={
                            <span className="w-4 h-4 bg-aciu-green-normal flex items-center justify-center rounded-[6px]">
                                <CheckIcon size={10} color="white"/>
                            </span>
                        }
                        indeterminateIcon={
                            <span className="w-4 h-4 bg-aciu-green-normal flex items-center justify-center rounded-[6px]">
                                <MinusIcon size={10} color="white" strokeWidth={3} />
                            </span>
                        }
                        indeterminate={table.getIsSomePageRowsSelected()}
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                    />
                ),
                cell: ({ row }: { row: Row<any>}) => (
                    <Checkbox
                        icon={
                            <span className="w-4 h-4 border border-aciu-gray-light rounded-[6px]" />
                        }
                        checkedIcon={
                            <span className="w-4 h-4 bg-aciu-green-normal flex items-center justify-center rounded-[6px]">
                                <CheckIcon size={10} color="white"/>
                            </span>
                        }
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                )
            },
        )}

        return base;
    }, [columns, withSelection]);

    const table = useReactTable({
        data,
        columns: memoizedColumns,
        // 10 rows per page
        pageCount: Math.ceil(data.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })
    return (
        <div className="w-full">
            <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
                
                <Table stickyHeader>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}
                                sx={{ 
                                    backgroundColor: "#F9FAFB", 
                                    borderBottom: "1px solid #EAECF0",
                                    height: "2.5rem"
                                }}>
                                {headerGroup.headers.map(header => (
                                    <TableCell 
                                        key={header.id} 
                                        colSpan={header.colSpan}
                                        sx={{
                                            padding: ".75rem 1.5rem",
                                            fontSize: ".75rem",
                                            fontFamily: 'Montserrat, sans-serif',
                                            color: "#667085",
                                            fontWeight: 500,
                                            whiteSpace: "nowrap"

                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell 
                                        key={cell.id}
                                        sx={{
                                            padding: "1rem 1.5rem",
                                            fontSize: ".875rem",
                                            fontFamily: 'Montserrat, sans-serif',
                                            color: "#3E3E3E",
                                            fontWeight: 400,
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis"
                                            
                                        }}
                                        >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            <div className="w-full pt-3 pb-4 px-6 flex justify-between items-center">
                <button
                    className="rounded-md py-2 px-[.875rem] 
                    flex gap-2 justify-center items-center
                    shadow-[0px_1px_2px_0px_#1018280D] border
                    border-grayscale-300 "
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeftIcon size={20} color="#00B686" />
                    <span className="font-medium text-sm text-aciu-green-normal font-inter">
                        Previous
                    </span>
                </button>
                <Pagination
                    total={table.getPageCount()}
                    page={table.getState().pagination.pageIndex + 1}
                    onChange={(page) => table.setPageIndex(page - 1)}
                    size="md"
                    classNames={{
                        cursor: "hidden"
                    }}
                    renderItem={(item) => {
                        const isActive = item.page === table.getState().pagination.pageIndex + 1;
                        return (
                            <button 
                                key={item.key}
                                // onPress is not a prop on button but is required from hero ui
                                onClick={item.onPress as unknown as React.MouseEventHandler<HTMLButtonElement>}
                                className={`w-[2.5rem] h-[2.5rem] rounded-md
                                ${isActive ? "bg-aciu-green-light " : ""}
                                rounded-md text-aciu-new-green-normal hover:bg-aciu-green-light font-inter`}>
                                {item.page || item.children}
                            </button>
                        )
                    }}
                />
                    <button
                    className="rounded-md py-2 px-[.875rem] 
                    flex gap-2 justify-center items-center
                    shadow-[0px_1px_2px_0px_#1018280D] border
                    border-grayscale-300 text-green-normal"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="font-medium text-sm text-aciu-green-normal font-inter">
                        Next
                    </span>
                    <ArrowRightIcon size={20} color="#00B686" />
                </button>
            </div>
        </div>
    )
}