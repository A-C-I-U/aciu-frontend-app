import { Avatar, Divider } from "@mui/material";
import DummyProfile from "/images/avatar.png";
import { formatDate } from "@/utils/helpers";
import type { BlogPost } from "@/services/types/blogs";
import { ArrowLeft2 } from "iconsax-react";

export default function PostViewHeader({
    post, onBack
}: { post: BlogPost, onBack: () => void }) {
    const {
        title,
        author,
        createdAt
    } = post;

    // Estimate reading time: content length / average reading speed
    const words = post.contentHtml?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return (
        <div className="flex flex-col gap-5.5 lg:gap-6">
            <div className="flex items-center gap-2 mt-5">
                <button
                    type="button"
                    title="Go back to previous page"
                    onClick={onBack}
                    className="btn-back mt-0! mb-0! max-w-fit left-0"
                >
                <ArrowLeft2 size={18} color="#898483" />
                <span className="ml-3 hidden! lg:inline-block">Back</span>
            </button>
                <h1 className="font-montserrat text-xl md:text-2xl leading-8 text-aciu-border-grey">
                    {title}
                </h1>
            </div>
            
            <div className="flex flex-col gap-5.5 lg:gap-6 items-start">
                <div className="flex justify-between lg:justify-auto lg:gap-12 items-center w-full lg:w-auto">
                    <div className="flex gap-2 items-center">
                        <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                        <p className="text-aciu-green-normal leading-5 text-xs lg:text-base">{author?.fullName || "Aciu Member"}</p>
                    </div>
                    <Divider orientation="vertical" variant="middle" sx={{ borderColor: "#3E3E3E"}} flexItem />
                    <p className="leading-5 text-aciu-abriba text-xs md:text-base">{`${readingTime} Minutes`}</p>
                    <Divider orientation="vertical" variant="middle" sx={{ borderColor: "#3E3E3E"}} flexItem />
                    <p className="leading-5 text-aciu-abriba text-xs md:text-base">
                        {createdAt ? formatDate(createdAt) : "Recently"}
                    </p>
                </div>
            </div>
        </div>
    )
}