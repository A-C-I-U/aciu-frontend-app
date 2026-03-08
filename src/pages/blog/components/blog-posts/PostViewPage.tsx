import { useParams, useNavigate } from "react-router-dom";
import { useBlogPostDetails, usePostComments } from "@/services/hooks/blogs";
import CommentBlock from "../shared/CommentBlock";
import ShareSection from "./ShareSection";
import PostViewHeader from "../shared/PostViewHeader";
import PostViewer from "../shared/PostViewer";
import { Alert } from "@mui/material";
import { PostViewerSkeleton, PostViewHeaderSkeleton, ShareSectionSkeleton } from "./Skeletons";

export default function PostViewPage() {
    const { id: postId } = useParams();
    const navigate = useNavigate();
    const { data: detailData, isLoading: isPostLoading, error: postError } = useBlogPostDetails(postId || "");
    const { data: commentsData, isLoading: isCommentsLoading } = usePostComments(postId || "");

    const post = detailData?.post;
    const comments = commentsData?.comments || [];

    const url = `https://www.aciu.org/blog/posts/${postId}`;


    if (isPostLoading) {
      return (
        <div className="mb-8 mx-5 flex flex-col gap-8">
          <PostViewHeaderSkeleton />
          <div className="grid lg:grid-cols-[3fr_24rem] gap-4">
            <div className="grid grid-rows-1 gap-8">
              <PostViewerSkeleton />
            </div>
            <div className="flex flex-col gap-8">
              <ShareSectionSkeleton />
            </div>
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
  <div className="mb-8 mx-5 flex flex-col gap-8">
    <PostViewHeader post={post} onBack={() => navigate(-1)} />
    <div className="grid lg:grid-cols-[3fr_24rem] gap-4">
      <div className="grid grid-rows-1 gap-8">
        <div className="w-full bg-white rounded-2xs py-6.5 px-6.5 h-full">
          <PostViewer content={post.contentHtml || ""} />
        </div>
        <div className="self-stretch">
          <CommentBlock postId={post.id} comments={comments} isLoading={isCommentsLoading} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <ShareSection title={post.title} url={url} postId={post.id} />
      </div>
    </div>
  </div>
    )
}