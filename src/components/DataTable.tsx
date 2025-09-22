import { useMemo, useState } from "react"
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
import { CheckIcon, MinusIcon } from "lucide-react";



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
    }, [columns, withSelection])

    const table = useReactTable({
        data,
        columns: memoizedColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
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
        </div>
    )
}