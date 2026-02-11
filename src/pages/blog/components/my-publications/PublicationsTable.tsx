import type { Publication } from "@/services/types/blogs"
import { useMemo, useState } from "react";
import { useMediaQuery } from "@mui/material";
import PostsTable from "../shared/PostsTable";
import { getColumns } from "./columns";
import MobilePublicationItem from "./MobilePublicationItem";
import { PaginationControls } from "../shared/PaginationControls";

export default function PublicationsTable({ data }: { data: Publication[] }) {
    const isMedium = useMediaQuery('(max-width:1250px)')
    const itemsPerPage = 6;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = data.slice(start, end)

    const columns = useMemo(() => getColumns(), []);

    return (
        <>
            {!isMedium ?
                <PostsTable
                    data={data}
                    columns={columns as any}
                    withSelection
                /> :
                <div className="grid gap-4 md:grid-cols-2">
                    {currentItems.map((publication) => (
                        <MobilePublicationItem
                            key={publication.id}
                            publication={publication}
                        />
                    ))}
                </div>
            }
            {isMedium && data.length > itemsPerPage &&
                <PaginationControls
                    total={data.length}
                    page={page}
                    onPageChange={setPage}
                    itemsPerPage={itemsPerPage}
                />
            }
        </>
    )
}