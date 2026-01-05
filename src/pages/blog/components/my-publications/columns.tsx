import { formatDate, publicationStatusMap } from "@/utils/helpers";
import { Eye } from "iconsax-react";
import { CommentOutlined } from "@ant-design/icons";
import type { PublicationDataType } from "@/utils/types";
import { Link } from "react-router-dom";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { StatusBadge } from "@/components/StatusBadge";

export const columns: ColumnDef<PublicationDataType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: { row: Row<PublicationDataType> }) => (
      <span className="font-medium text-aciu-border-grey">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "creationDate",
    header: "Creation Date",
    cell: ({ row }: { row: Row<PublicationDataType> }) => (
      <span className="text-aciu-abriba">{formatDate(row.original.creationDate)}</span>
    ),
  },
  {
    id: "postImpressions",
    header: "Post Impressions",
    cell: ({ row }: { row: Row<PublicationDataType> }) => {
      const { comments, views } = row.original.postImpressions;
      return (
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-aciu-border-grey">
            <Eye fontVariant="linear" size={16} color="#3E3E3E" />
            {views.toLocaleString()}
          </span>
          <span className="flex items-center gap-2 text-aciu-border-grey">
            <CommentOutlined size={16} color="#3E3E3E" />
            {comments.toLocaleString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastModified",
    header: "Last Modified",
    cell: ({ row }: { row: Row<PublicationDataType> }) => (
      <span className="text-aciu-abriba">{formatDate(row.original.lastModified)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    maxSize: 300,
    cell: ({ getValue }) => {
      const status = getValue() as PublicationDataType["status"];
      const statusConfig = publicationStatusMap[status];

      return (
        <StatusBadge
          label={statusConfig.label}
          labelColor={statusConfig.labelColor}
          bgColor={statusConfig.bgColor}
          dotColor={statusConfig.dotColor}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 150,
    cell: ({ row }: { row: Row<PublicationDataType> }) => (
      <Link
        to={`/blog/posts/${row.original.id}`}
        className="p-2 text-sm font-coolvetica text-aciu-green-normal rounded-[5px] border border-aciu-green-normal min-w-36.5 whitespace-nowrap hover:bg-aciu-green-light transition-colors text-center block"
      >
        View Post
      </Link>
    ),
  },
];