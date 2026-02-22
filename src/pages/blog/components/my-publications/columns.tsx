import { formatDate, publicationStatusMap } from "@/utils/helpers";
import { Eye as EyeLinear } from "iconsax-react";
import { CommentOutlined } from "@ant-design/icons";
import type { Publication } from "@/services/types/blogs";
import { useNavigate } from "react-router-dom";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { StatusBadge } from "@/components/StatusBadge";
import { Eye } from "lucide-react";

export const getColumns = (): ColumnDef<Publication>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: { row: Row<Publication> }) => (
      <span className="font-medium text-aciu-border-grey">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Creation Date",
    cell: ({ row }: { row: Row<Publication> }) => (
      <span className="text-aciu-abriba">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "postImpressions",
    header: "Post Impressions",
    cell: ({ row }: { row: Row<Publication> }) => {
      const { commentsCount, views } = row.original;
      return (
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-aciu-border-grey">
            <EyeLinear fontVariant="linear" size={16} color="#3E3E3E" />
            {(views || 0).toLocaleString()}
          </span>
          <span className="flex items-center gap-2 text-aciu-border-grey">
            <CommentOutlined size={16} color="#3E3E3E" />
            {(commentsCount || 0).toLocaleString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: ({ row }: { row: Row<Publication> }) => (
      <span className="text-aciu-abriba">
        {formatDate(row.original.updatedAt)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    maxSize: 300,
    cell: ({ getValue }) => {
      const status = getValue() as Publication["status"];
      const statusConfig = publicationStatusMap[status.toLowerCase() as keyof typeof publicationStatusMap] || publicationStatusMap["draft"];

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
    cell: ({ row }: { row: Row<Publication> }) => {
      const navigate = useNavigate();

      const handleViewPost = () => {
        if (row.original.status.toLowerCase() === "draft") {
          navigate(`/blog/posts/${row.original.id}/edit`)
        } else {
          navigate(`/blog/posts/${row.original.id}`)
        }
      }

      return (
        <button
          onClick={handleViewPost}
          className="flex items-center gap-2 px-3 py-2 border border-aciu-green-normal 
            rounded-[5px] text-aciu-green-normal font-montserrat font-semibold text-sm
            hover:bg-aciu-green-normal hover:text-white transition-colors duration-200"
        >
          <Eye size={16} />
          View Post
        </button>
      )
    },
  },
];
