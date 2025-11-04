import { formatDate, publicationStatusMap } from "@/utils/helpers";
import { Eye } from "iconsax-react";
import { CommentOutlined } from "@ant-design/icons";
import type { PublicationDataType } from "@/utils/types";
import { Link } from "react-router-dom";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { blogDetails } from "@/utils/data";
import { StatusBadge } from "@/components/StatusBadge";

export const columns: ColumnDef<PublicationDataType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }: { row: Row<PublicationDataType> }) => <span>{row.original.title}</span>
    },
    {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }: {row: Row<PublicationDataType> }) => <span>{formatDate(row.original.creationDate)}</span>
    },
    {
        accessorKey: "postImpressions",
        header: "Post Impressions",
        cell: ({ row }: {row: Row<PublicationDataType> }) => {
            const { comments, views } = row.original.postImpressions;

            return (
                <span className="gap-4 flex items-center">
                    <span className="gap-2 flex items-center">
                        <Eye fontVariant="linear" size={16} color="#3E3E3E"/>
                        {views || '-'}
                    </span>
                    <span className="gap-2 flex items-center">
                        <CommentOutlined size={16} color="#3E3E3E" />
                        {comments || '-'}
                    </span>
                </span>
            )
        }
    },
    {
        accessorKey: "lastModified",
        header: "Last Modified",
        cell: ({ row }: {row: Row<PublicationDataType> }) => <span>{formatDate(row.original.lastModified)}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue();
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = publicationStatusMap[status as PublicationDataType["status"]];

            return (
                <StatusBadge
                    label={label}
                    labelColor={labelColor}
                    bgColor={bgColor}
                    dotColor={dotColor}
                />
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 150,
        cell: () => (
            // TODO: Add `{ row }: { row: Row<PublicationDataType> }` as a prop when integrating
            <Link to={`/blog/posts/${blogDetails.slug}`}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px]
                border border-aciu-green-normal min-w-36.5 whitespace-nowrap"
            >
                View Post
            </Link>
        )
    }
]
