import { Checkbox } from "@mui/material";
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
import DeletePost from "./DeletePost";
import { useDeletePublication } from "@/services/mutations/blogs";
import { enqueueSnackbar } from "notistack";

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

    const deleteMutation = useDeletePublication();

    const memoizedColumns = useMemo(() => {
        const base = [...columns];

        if (withSelection) {
            base.unshift({
                id: "select",
                header: ({ table }: { table: TableType<any> }) => (
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
                                <CheckIcon size={10} color="white" />
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
                cell: ({ row }: { row: Row<any> }) => (
                    <Checkbox
                        icon={
                            <span className="w-4 h-4 border border-aciu-gray-light rounded-[6px]" />
                        }
                        checkedIcon={
                            <span className="w-4 h-4 bg-aciu-green-normal 
                                flex items-center justify-center rounded-[6px]">
                                <CheckIcon size={10} color="white" />
                            </span>
                        }
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                )
            },
            )
        }

        return base;
    }, [columns, withSelection]);

    const table = useReactTable({
        data,
        columns: memoizedColumns,
        pageCount: Math.ceil(data.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    const selectedRowCount = Object.keys(rowSelection).length;

    const handleSelectAll = () => {
        table.toggleAllRowsSelected();
    };

    const handleDelete = async () => {
        const idsToDelete = table.getSelectedRowModel().rows.map((r: Row<any>) => r.original.id)

        try {
            await Promise.all(idsToDelete.map(id => deleteMutation.mutateAsync(id)));
            enqueueSnackbar("Successfully deleted publication(s)", { variant: "success" });
        } catch (error: any) {
            const message = error.response?.data?.error || error.response?.data?.details?.[0] || error.response?.data?.message || "Failed to delete publication(s)";
            enqueueSnackbar(message, { variant: "error" });
        } finally {
            setRowSelection({});
            setOpenDelete(false);
        }
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

            <DeletePost
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                handleDelete={handleDelete}
                loading={deleteMutation.isPending}
            />
        </div>
    )
}