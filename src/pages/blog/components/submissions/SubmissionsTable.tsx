import { generateMockPublications } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import PostsTable from "../shared/PostsTable";
import MobilePublicationItem from "../my-publications/MobilePublicationItem";
import { PaginationControls } from "../shared/PaginationControls";
import ApprovePost from "./ApprovePost";
import RejectPost from "./RejectPost";

export default function SubmissionsTable() {
    const isMedium = useMediaQuery('(max-width:1250px)')
    const itemsPerPage = 4;
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogType, setDialogType] = useState<"approve" | "reject" | null>(null);
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end)

    const handleOpenDialog = (type: "approve" | "reject", id: string ) => {
        setDialogType(type);
        setSelectedId(id);
    };

    const handleCloseDialog = () => {
        setDialogType(null);
        setSelectedId(null);
    };

    const columns = useMemo(() => getColumns(handleOpenDialog), []);

    return (
        <>
        {!isMedium ? 
            <PostsTable
                data={mockData}
                columns={columns}
                withSelection
            /> 
            :
            <div className="grid gap-4 md:grid-cols-2">
                {currentItems.map((publication) => (
                    <MobilePublicationItem
                        key={publication.id}
                        publication={publication} 
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
        <ApprovePost
            id={selectedId ?? ""}
            open={dialogType === "approve"}
            onClose={handleCloseDialog}
        />
        <RejectPost
            id={selectedId ?? ""}
            open={dialogType === "reject"}
            onClose={handleCloseDialog}
        />
    </>
    )
}

const mockData: PublicationDataType[] = generateMockPublications(20);