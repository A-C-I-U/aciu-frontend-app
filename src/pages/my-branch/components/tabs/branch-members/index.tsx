import type { BranchMemberDataType, FieldConfig } from "@/utils/types";
import { Skeleton, useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState, useCallback } from "react";
import { columns } from "./columns";
import SectionHeader from "@/components/SectionHeader";
import DataTable from "@/components/DataTable";
import { branchMemberStatusMap } from "@/utils/helpers";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import ViewBranchMember from "./ViewBranchMember";
import { formatDate } from "date-fns";
import { useBranchMembers } from "@/services/hooks/branch";

const sectionActions = [
    <button className="section-action-button">
        Filter
    </button>,
    <button className="section-action-button">
        2022
    </button>
]


export default function BranchMembersTab() {
    const [_query, setQuery] = useState("");
    const [selected, setSelected] = useState<BranchMemberDataType | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const { data: members, isLoading } = useBranchMembers();

    // Transform API data to table data
    const tableData: BranchMemberDataType[] = useMemo(() =>
        members?.map(member => ({
            id: member.id,
            fullName: member.fullName,
            ageGrade: member.ageGrade,
            joinedOn: member.joinedOn,
            occupation: member.occupation,
            verificationStatus: member.verificationStatus ? "verified" : "pending"
        })) || [],
        [members]
    );

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = tableData.slice(start, end);

    const handleViewClick = useCallback((member: BranchMemberDataType) => {
        setSelected(member);
        setIsViewOpen(true);
    }, []);

    const tableColumns = useMemo(
        () => columns(handleViewClick),
        [handleViewClick]
    );

    const table = useReactTable<BranchMemberDataType>({
        data: tableData,
        columns: tableColumns,
        pageCount: Math.ceil(tableData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 px-4">
                <Skeleton variant="rectangular" height={60} className="rounded-lg" />
                <div className="grid gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={80} className="rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title={!isLarge ? "Branch Member Management" : ""}
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                    noTitle={!isLarge ? false : true}
                />
            </div>

            <>
                {!isMedium ?
                    <DataTable
                        table={table}
                    />
                    :

                    <div className="grid gap-4 md:grid-cols-2">
                        {currentItems.map((branchMember: BranchMemberDataType) => (
                            <MobileItemCard
                                key={branchMember.id}
                                item={branchMember}
                                fields={fields}
                                status={branchMemberStatusMap[branchMember.verificationStatus]}
                                actionLabel="View Details"
                                onActionClick={() => handleViewClick(branchMember)}
                            />
                        ))}
                    </div>
                }
                {isMedium &&
                    <PaginationControls
                        total={tableData.length}
                        page={page}
                        onPageChange={setPage}
                        itemsPerPage={itemsPerPage}
                    />
                }
            </>

            <ViewBranchMember
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                branchMember={selected}
            />

        </div>
    )

}

const fields: FieldConfig<BranchMemberDataType>[] = [
    {
        label: "Full Name",
        value: (p) => p.fullName,
    },
    {
        label: "Age Grade",
        value: (p) => p.ageGrade
    },
    {
        label: "Joined On",
        value: (p) => {
            try {
                return formatDate(new Date(p.joinedOn), "dd-MM-yyyy h:mm aaaaa'm'");
            } catch {
                return "N/A";
            }
        }
    },
    {
        label: "Occupation",
        value: (p) => p.occupation
    }
]