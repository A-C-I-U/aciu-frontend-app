import { useMediaQuery, Skeleton, Alert } from "@mui/material";
import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import PostsTable from "../shared/PostsTable";
import MobilePublicationItem from "../my-publications/MobilePublicationItem";
import { PaginationControls } from "../shared/PaginationControls";
import ApprovePost from "./ApprovePost";
import RejectPost from "./RejectPost";
import { useSubmissions } from "@/services/hooks/blogs";

export default function SubmissionsTable() {
    const isMedium = useMediaQuery('(max-width:1250px)')
    const itemsPerPage = 10;
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogType, setDialogType] = useState<"approve" | "reject" | null>(null);
    const [page, setPage] = useState(1);

    const { data: submissionsData, isLoading, error } = useSubmissions();
    const submissions = submissionsData?.posts || [];

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = submissions.slice(start, end)

    const handleOpenDialog = (type: "approve" | "reject", id: string) => {
        setDialogType(type);
        setSelectedId(id);
    };

    const handleCloseDialog = () => {
        setDialogType(null);
        setSelectedId(null);
    };

    const columns = useMemo(() => getColumns(handleOpenDialog), []);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={60} className="rounded-lg" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Failed to load submissions. Please try again later.
            </Alert>
        );
    }

    return (
        <>
            {!isMedium ?
                <PostsTable
                    data={submissions}
                    columns={columns as any}
                    withSelection
                />
                :
                <div className="grid gap-4 md:grid-cols-2">
                    {currentItems.map((publication: any) => (
                        <MobilePublicationItem
                            key={publication.id}
                            publication={publication}
                        />
                    ))}
                </div>
            }
            {isMedium && submissions.length > itemsPerPage &&
                <PaginationControls
                    total={submissions.length}
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