import DataTable from "@/components/DataTable";
import { generateMockPublications, publicationStatusMap } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/helpers";
import { Link } from "react-router-dom";
import { Eye } from "@solar-icons/react";
import { CommentOutlined } from "@ant-design/icons";

export default function PublicationsTable() {
    return (
        <DataTable 
            data={mockData}
            columns={columns}
            withSelection
        />
        
    )
}

const mockData: PublicationDataType[] = generateMockPublications(20);

export const columns: ColumnDef<PublicationDataType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }: { row: any }) => <span>{row.original.title}</span>
    },
    {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }: {row: any}) => <span>{formatDate(row.original.creationDate)}</span>
    },
    {
        accessorKey: "postImpressions",
        header: "Post Impressions",
        cell: ({ row }: {row: any }) => {
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
        cell: ({ row }: {row: any}) => <span>{formatDate(row.original.lastModified)}</span>
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
                <span 
                    style={{
                        backgroundColor: bgColor,
                        color: labelColor,
                        height: "2rem"
                    }} 
                    className="py-[2px] pr-2 pl-[6px] whitespace-nowrap
                        flex gap-[6px] items-center rounded-[1rem]
                        text-xs font-motserrat font-medium max-w-fit"
                >
                    <span style={{
                        backgroundColor: dotColor
                    }} className="w-[6px] h-[6px] rounded-full"></span>
                    {label}
                </span>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 150,
        cell: () => (
            <Link to={"/blog/post/1"}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px] 
                border border-aciu-green-normal min-w-[145px] whitespace-nowrap">
                View Post
            </Link>
        )
    }
]

