import { publicationStatusMap } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { Eye } from "@solar-icons/react";
import { CommentOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/helpers";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import { Divider } from "@mui/material";

export default function MobilePublicationItem({ 
    publication
}: {
    publication: PublicationDataType
}) {
     const { 
        id,
        title, 
        creationDate, 
        lastModified, 
        postImpressions,
        status
    } = publication;

    const { 
        label, 
        labelColor, 
        dotColor, 
        bgColor 
    } = publicationStatusMap[status as PublicationDataType["status"]];

    const { comments, views } = postImpressions;

    return (
        <div className="w-full py-4.5 flex flex-col gap-4 items-center rounded-[.625rem] border border-grayscale-200">
            <div className="flex justify-between items-center w-full px-3">
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-xs text-aciu-abriba font-medium">
                        Title
                    </p>
                    <p className="text-sm text-aciu-border-grey overflow-hidden ellipsis">
                        {title}
                    </p>
                </div>
                <StatusBadge
                    label={label}
                    labelColor={labelColor}
                    bgColor={bgColor}
                    dotColor={dotColor}
                />
            </div>

            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>

            <div className="flex justify-between w-full items-center px-3">
                <p className="text-xs font-medium text-aciu-abriba">
                    Creation Date
                </p>
                <p className="text-sm text-aciu-border-grey">
                    {formatDate(creationDate)}
                </p>
            </div>

             <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>

            <div className="flex justify-between w-full items-center px-3">
                <p className="text-xs font-medium text-aciu-abriba">
                    Last Modified
                </p>
                <p className="text-sm text-aciu-border-grey">
                    {formatDate(lastModified)}
                </p>
            </div>

            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>

            <div className="flex justify-between w-full items-center px-3">
                <p className="text-xs font-medium text-aciu-abriba">
                    Post Impressions
                </p>
                <p className="text-sm text-aciu-border-grey">
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
                </p>
            </div>
            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>
            <Link to={`/blogs/${id}`}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px] pointer-events-none
                border border-aciu-green-normal w-11/12 mx-auto 
                text-center whitespace-nowrap">
                View Post
            </Link>
        </div>
    )
}