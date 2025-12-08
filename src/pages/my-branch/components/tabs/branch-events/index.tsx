import SectionHeader from "@/components/SectionHeader";
import { formatDate, generateMockBranchEvents, paymentStatusMap } from "@/utils/helpers";
import type { BranchEventDataType, FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import { Link, useNavigate } from "react-router-dom";

const sectionActions = [
    <button className="section-action-button">
        Filter
    </button>,
    <button className="section-action-button">
        2022
    </button>
]

export default function BranchEventsTab() {
    const [_query, setQuery] = useState(""); // TODO: Remove underscore when search logic is implemented
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const navigate = useNavigate();


    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const table = useReactTable<BranchEventDataType>({
        data: mockData,
        columns: columns,
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    const handleSearch = (q: string) => {
        setQuery(q)
    }
    
    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} flex-wrap gap-y-2 md:gap-4`}>
                <SectionHeader
                    title={!isMedium ? "Branch Events" : ""}
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                    noTitle={!isMedium ? false : true}
                />
                <Link
                    className="btn btn-primary max-w-fit !text-sm md:text-base!"
                    to={`/my-branch/add-event`}
                >
                   Add new Event
                </Link>
            </div>

            <>
                {!isMedium ?
                    <DataTable 
                        table={table}
                    />
                    :
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        {currentItems.map((branchEvent: BranchEventDataType) => (
                            <MobileItemCard
                                key={branchEvent.id}
                                item={branchEvent}
                                fields={fields}
                                status={paymentStatusMap[branchEvent.verificationStatus]}
                                actionLabel="View Dues"
                                onActionClick={() => navigate(`/events/${1}`)}
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
        </div>
    )
}

const mockData = generateMockBranchEvents(20)
const fields: FieldConfig<BranchEventDataType>[] = [
    {
        label: "Event Title",
        value: (p) => p.eventTitle
    },
    {
        label: "Created by",
        value: (p) => formatDate(p.createdBy)
    },
    {
        label: "Created on",
        value: (p) => formatDate(p.createdOn)
    },
    {
        label: "Registered",
        value: (p) => p.registered
    }
]