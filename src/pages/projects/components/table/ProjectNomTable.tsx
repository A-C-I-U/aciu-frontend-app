import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import type { NominatedProject } from "@/services/types/projects";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { FieldConfig, WithdrawalDataType } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import ProjectNomDetail from "./ProjectNomDetail";

export default function ProjectNominationsTable({
    data, columns
}: { data: NominatedProject[], columns: (dataItem: any) => any[]}) {
    const isMedium = useMediaQuery('(max-width:1250px)')
    const [selected, setSelected] = useState<NominatedProject | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);


    const handleViewClick = (withdrawal: NominatedProject) => {
        setSelected(withdrawal);
        setViewOpen(true)
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = data.slice(start, end);
    const table = useReactTable({
        data,
        columns: columns(handleViewClick),
        pageCount: Math.ceil(data.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            {!isMedium ?
                <DataTable 
                    table={table}
                /> : 
                <div className="grid gap:4 md:grid-cols-2">
                    {currentItems.map((project: NominatedProject) => (
                        <MobileItemCard
                            key={project.id}
                            item={project}
                            fields={fields}
                            status={withdrawalStatusMap[project.status.toLowerCase() as WithdrawalDataType["status"]]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(project)}
                        />
                    ))}
                </div>
            }
            {isMedium &&
                <PaginationControls
                    total={data.length}
                    page={page}
                    onPageChange={setPage}
                    itemsPerPage={itemsPerPage}
                />
            }

            <ProjectNomDetail
                open={isViewOpen}
                onClose={handleViewClose}
                id={selected && selected.id}
                projectId={selected && selected.projectId}

            />
        </>
    )
}

const fields: FieldConfig<NominatedProject>[] = [
    { label: 'Estimated Cost', value: (p) => `₦${Math.round(+p.estimatedCost).toLocaleString()}`},
    { label: "Project ID", value: (p) => p.projectId},
    { label: "Date", value: (p) => p.date},
    { label: "Submitted By", value: (p) => p.submittedBy},

]