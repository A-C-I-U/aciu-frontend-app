import { useParams, } from "react-router-dom";
import { useBlogPostDetails, usePostComments } from "@/services/hooks/blogs";
import CommentBlock from "../shared/CommentBlock";
import ShareSection from "./ShareSection";
import PostViewHeader from "../shared/PostViewHeader";
import PostViewer from "../shared/PostViewer";
import { Skeleton, Alert } from "@mui/material";

export default function PostViewPage() {
    const { slug: postId } = useParams();
    const { data: detailData, isLoading: isPostLoading, error: postError } = useBlogPostDetails(postId || "");
    const { data: commentsData, isLoading: isCommentsLoading } = usePostComments(postId || "");

    const post = detailData?.post;
    const comments = commentsData?.comments || [];

    const url = `https://www.aciu.org/blog/posts/${postId}`;

    if (isPostLoading) {
        return (
            <div className="my-8 mx-5 flex flex-col gap-8">
                <Skeleton variant="rectangular" height={100} className="rounded-lg" />
                <div className="grid lg:grid-cols-[3fr_24rem] gap-4">
                    <Skeleton variant="rectangular" height={600} className="rounded-lg" />
                    <Skeleton variant="rectangular" height={400} className="rounded-lg" />
                </div>
            </div>
        );
    }

    if (postError || !post) {
        return (
            <div className="my-8 mx-5">
                <Alert severity="error">
                    {postError ? "Failed to load blog post. Please try again later." : "Blog post not found."}
                </Alert>
            </div>
        );
    }

    return (
        <div className="my-8 mx-5 flex flex-col gap-8">
            <PostViewHeader post={post} />
            <div className="grid lg:grid-cols-[3fr_24rem] gap-4">
                <div className="flex flex-col gap-8">
                    <div className="w-full bg-white rounded-[.625rem] py-6.5 px-6.5 max-h-fit">
                        <PostViewer content={post.contentHtml || ""} />
                    </div>
                    <CommentBlock postId={post.id} comments={comments} isLoading={isCommentsLoading} />
                </div>
                <div className="flex flex-col gap-8">
                    <ShareSection title={post.title} url={url} postId={post.id} />

                </div>
            </div>

        </div>
    )
}