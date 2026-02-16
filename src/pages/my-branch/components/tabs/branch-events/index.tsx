import SectionHeader from "@/components/SectionHeader";
import { branchPaymentStatusMap, formatDate } from "@/utils/helpers";
import type { FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTable";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import { Link, useNavigate } from "react-router-dom";
import { useAllEvents } from "@/services/hooks/events";
import type { Event } from "@/services/types/events";
import TableSkeleton from "@/components/TableSkeleton";
import { EventItemSkeleton } from "@/components/EventSkeleton";

const sectionActions = [
    <button key="filter" className="section-action-button">
        Filter
    </button>,
    <button key="year" className="section-action-button">
        2022
    </button>
]

export default function BranchEventsTab() {
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const navigate = useNavigate();

    const itemsPerPage = 9;
    const [page, setPage] = useState(1);

    const { data, isLoading } = useAllEvents(page);
    const rawEvents = data?.events || [];
    const totalEvents = data?.total || 0;

    // Sort events by date descending (latest first)
    const sortedEvents = [...rawEvents].sort((a, b) =>
        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );

    const table = useReactTable<Event>({
        data: sortedEvents,
        columns: columns as any,
        pageCount: data?.totalPages || 1,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true
    })

    const handleSearch = (q: string) => {
        console.log("Searching for:", q);
    }

    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
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

            {isLoading ? (
                <>
                    {!isMedium ? (
                        <TableSkeleton columns={5} rows={5} />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <EventItemSkeleton key={i} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {!isMedium ?
                        <DataTable
                            table={table}
                            pagination={false}
                        />
                        :
                        <div className="grid gap-4 md:grid-cols-2">
                            {sortedEvents.length === 0 && (
                                <p className="text-center col-span-full py-10 text-grayscale-100">
                                    No events found.
                                </p>
                            )}
                            {sortedEvents.map((branchEvent: Event) => (
                                <MobileItemCard
                                    key={branchEvent.id}
                                    item={branchEvent}
                                    fields={fields as any}
                                    status={branchPaymentStatusMap[branchEvent.verificationStatus.toLowerCase()] || branchPaymentStatusMap["completed"]}
                                    actionLabel="View Details"
                                    onActionClick={() => navigate(`/events/${branchEvent.id}`)}
                                />
                            ))}
                        </div>
                    }
                    <PaginationControls
                        total={totalEvents}
                        page={page}
                        onPageChange={setPage}
                        itemsPerPage={itemsPerPage}
                        desktop={!isMedium}
                    />
                </>
            )}
        </div>
    )
}

const fields: FieldConfig<Event>[] = [
    {
        label: "Event Title",
        value: (p) => p.title
    },
    {
        label: "Created by",
        value: (p) => p.createdBy // You might want to map this to a name if available
    },
    {
        label: "Event Date",
        value: (p) => formatDate(p.eventDate)
    },
    {
        label: "Registered",
        value: (p) => p.registeredCount
    }
]