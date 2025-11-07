import { blogDetails } from "@/utils/data";
import CommentBlock from "../shared/CommentBlock";
import ShareSection from "./ShareSection";
import PostViewHeader from "../shared/PostViewHeader";
import PostViewer from "../shared/PostViewer";

export default function PostViewPage() {
    const {
        slug,
        title,
        content,
        comments
    } = blogDetails;

    const url = `https://www.aciu.org/${slug}`;


    return (
        <div className="my-8 mx-5 flex flex-col gap-8">
           <PostViewHeader post={blogDetails} />
            <div className="grid lg:grid-cols-[3fr_24rem] gap-4">
                <div className="flex flex-col gap-4">
                    <div className="w-full bg-white rounded-[.625rem] py-6.5 px-6.5 max-h-fit">
                        <PostViewer content={content} />
                    </div>
                    <CommentBlock comments={comments} />
                </div>
                <ShareSection title={title} url={url} />
            </div>

        </div>
    )
}