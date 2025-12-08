import type { BranchMemberDataType, FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import SectionHeader from "@/components/SectionHeader";
import DataTable from "@/components/DataTable";
import { branchMemberStatusMap, generateMockBranchMembers } from "@/utils/helpers";
import MobileItemCard from "@/components/MobileItem";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
import ViewBranchMember from "./ViewBranchMember";

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
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end);

    const handleViewClick = (member: BranchMemberDataType) => {
        setSelected(member);
        setIsViewOpen(true)
    }

    const table = useReactTable<BranchMemberDataType>({
        data: mockData,
        columns: columns(handleViewClick),
        pageCount: Math.ceil(mockData.length / 10),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Branch Member Management"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
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
                                actionLabel="View Dues"
                                onActionClick={() => setSelected(branchMember)}
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
            
            <ViewBranchMember 
                open={isViewOpen} 
                onClose={() => setIsViewOpen(false)} 
                branchMember={selected}
            />
            
        </div>
    )
    
}
    
const mockData = generateMockBranchMembers(20);

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
        value: (p) => p.joinedOn
    },
    {
        label: "Occupation",
        value: (p) => p.occupation
    }
]