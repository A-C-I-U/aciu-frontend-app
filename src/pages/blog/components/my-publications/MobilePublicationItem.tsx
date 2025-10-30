import { publicationStatusMap } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { Eye } from "@solar-icons/react";
import { CommentOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/helpers";
import { Link } from "react-router-dom";

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
        <div className="w-full py-[1.125rem] px-3 flex flex-col gap-4 items-center rounded-[.625rem] border border-grayscale-200">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-xs font-montserrat text-aciu-abriba font-medium">
                        Title
                    </p>
                    <p className="text-sm text-aciu-border-grey font-montserrat overflow-hidden ellipsis">
                        {title}
                    </p>
                </div>
                 <span 
                    style={{
                        backgroundColor: bgColor,
                        color: labelColor,
                        height: "2rem"
                    }} 
                    className="py-[2px] pr-2 pl-[6px] whitespace-nowrap
                        flex gap-[6px] items-center rounded-[1rem]
                        text-xs font-montserrat font-medium max-w-fit"
                >
                    <span style={{
                        backgroundColor: dotColor
                    }} className="w-[6px] h-[6px] rounded-full"></span>
                    {label}
                </span>
            </div>

            <div className="w-full">
                <hr className="w-full border-t-[.5px] text-aciu-dark-grey" color="#C9C9C9"/>
            </div>

            <div className="flex justify-between w-full items-center">
                <p className="text-xs font-medium font-montserrat text-aciu-abriba">
                    Creation Date
                </p>
                <p className="font-montserrat text-sm text-aciu-border-grey">
                    {formatDate(creationDate)}
                </p>
            </div>

             <div className="w-full">
                <hr className="w-full border-t-[.5px] text-aciu-dark-grey" color="#C9C9C9"/>
            </div>

            <div className="flex justify-between w-full items-center">
                <p className="text-xs font-medium font-montserrat text-aciu-abriba">
                    Last Modified
                </p>
                <p className="font-montserrat text-sm text-aciu-border-grey">
                    {formatDate(lastModified)}
                </p>
            </div>

            <div className="w-full">
                <hr className="w-full border-t-[.5px] text-aciu-dark-grey" color="#C9C9C9"/>
            </div>
            <div className="flex justify-between w-full items-center">
                <p className="text-xs font-medium font-montserrat text-aciu-abriba">
                    Post Impressions
                </p>
                <p className="text-sm font-montserrat text-aciu-border-grey">
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
            <Link to={`/blogs/${id}`}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px] pointer-events-none
                border border-aciu-green-normal min-w-[145px] w-full 
                text-center whitespace-nowrap">
                View Post
            </Link>
        </div>
    )
}