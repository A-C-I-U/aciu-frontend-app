import { Avatar, Divider } from "@mui/material";
import DummyProfile from "/images/avatar.png";
import { formatDate } from "@/utils/helpers";
import type { BlogDetails } from "@/utils/types";

export default function PostViewHeader({
    post
}: { post: BlogDetails }) {
    const {
        title,
        author,
        readingTime,
        createdAt
    } = post;

    return (
        <div className="flex flex-col gap-6 items-start ml-4">
            <h1 className="font-montserrat text-2xl leading-8 text-aciu-border-grey">
                {title}
            </h1>
            <div className="flex justify-between lg:justify-auto lg:gap-12 items-center w-full lg:w-auto">
                <div className="flex gap-2 items-center">
                    <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                    <p className="text-aciu-green-normal leading-5">{author}</p>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem />
                <p className="leading-5 text-aciu-abriba">{`${readingTime} Minutes`}</p>
                <Divider orientation="vertical" variant="middle" flexItem />
                <p className="leading-5 text-aciu-abriba">{formatDate(createdAt.toDateString())}</p>
            </div>
        </div>
    )
}