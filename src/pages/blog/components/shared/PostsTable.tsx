import { Box, Checkbox, Dialog } from "@mui/material";
import {
    getCoreRowModel, 
    getPaginationRowModel, 
    useReactTable, 
    type Row, 
    type Table as TableType
 } from "@tanstack/react-table";
import { CheckIcon, MinusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { CustomSnackbar } from "./CustomSnackbar";
import DataTable from "@/components/DataTable";
import { TrashIcon } from "@/components/Icons";

export default function PostsTable(
    {
        data,
        columns,
        withSelection
    }: {
        data: any,
        columns: any,
        withSelection: boolean
    }
) {
    const [rowSelection, setRowSelection] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    
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
                            <span className="w-4 h-4 bg-aciu-green-normal 
                                flex items-center justify-center rounded-[6px]">
                                <CheckIcon size={10} color="white"/>
                            </span>
                        }
                        indeterminateIcon={
                            <span className="w-4 h-4 bg-aciu-green-normal 
                                flex items-center justify-center rounded-[6px]">
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
                            <span className="w-4 h-4 bg-aciu-green-normal 
                                flex items-center justify-center rounded-[6px]">
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

    // Retrieve number of selected rows
    const selectedRowCount = Object.keys(rowSelection).length;

    const handleSelectAll = () => {
        table.toggleAllRowsSelected();
    };

    const handleDelete = () => {
        // const idsToDelete = table.getSelectedRowModel().rows.map((r: Row<any>) => r.original.id)
        setRowSelection({});
        setOpenDelete(false);
    }

    const handleClearSelection = () => setRowSelection({});

    return (
        <div className="w-full relative overflow-hidden">
            <DataTable table={table} />
            <CustomSnackbar
                selectedCount={selectedRowCount}
                totalCount={data.length}
                onSelectAll={handleSelectAll}
                onClear={handleClearSelection}
                onDelete={() => setOpenDelete(true)}
            />


            <Dialog 
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "1.25rem"
                        }
                    }
                }}
                onClose={() => setOpenDelete(false)} 
                open={openDelete}
                disableScrollLock
            >
                <Box
                    sx={{
                        padding: "1.875rem",
                        width: "31.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.375rem",
                        borderRadius: "1.25rem"
                    }}>
                    <TrashIcon />
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <h3 className="text-2xl font-coolvetica text-aciu-border-grey font-bold">
                            Delete Post?
                        </h3> 
                        <p className="text-aciu-neutral font-montserrat">
                            Are you sure you want to permanently delete these selected posts? 
                            This action cannot be undone.
                        </p>
                    </Box>
                    <Box display="flex" gap="1.275rem" alignItems="center">
                        <button
                            className="p-4 gap-2 rounded-xl 
                            bg-aciu-green-normal text-white 
                            font-coolvetica w-full"
                            onClick={handleDelete}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="p-4 gap-2 rounded-xl 
                            bg-aciu-green-normal text-white 
                            font-coolvetica w-full"
                            onClick={() => setOpenDelete(false)}
                        >
                            No, Cancel
                        </button>
                    </Box>
                </Box>
            </Dialog>
        </div>
    )
}