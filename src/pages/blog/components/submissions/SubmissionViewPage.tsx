import { useParams } from "react-router-dom";
import PostViewHeader from "../shared/PostViewHeader";
import { useState } from "react";
import ApprovePost from "./ApprovePost";
import RejectPost from "./RejectPost";
import PostMetadataForm from "../shared/PostMetadataForm";
import PostViewer from "../shared/PostViewer";
import { useBlogPostDetails } from "@/services/hooks/blogs";
import { Skeleton, Alert } from "@mui/material";

export default function SubmissionViewPage() {
    const { id } = useParams();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogType, setDialogType] = useState<"approve" | "reject" | null>(null);
    const { data, isLoading, error } = useBlogPostDetails(id || "");
    const post = data?.post;

    const handleOpenDialog = (type: "approve" | "reject", id: string) => {
        setDialogType(type);
        setSelectedId(id);
    };

    const handleCloseDialog = () => {
        setDialogType(null);
        setSelectedId(null);
    };

    if (isLoading) {
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

    if (error || !post) {
        return (
            <div className="my-8 mx-5">
                <Alert severity="error">
                    {error ? "Failed to load submission details. Please try again later." : "Submission not found."}
                </Alert>
            </div>
        );
    }

    return (
        <div className="my-8 mx-5 flex flex-col gap-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-0 lg:justify-between">
                <PostViewHeader post={post} />
                <div className="flex gap-4 items-center">
                    <button
                        className="rounded-xl p-4 border border-red-50
                        font-coolvetica text-red-100"
                        onClick={() => handleOpenDialog("reject", post.id)}
                    >
                        Reject Post
                    </button>
                    <button
                        className="p-4 rounded-xl bg-aciu-green-normal
                        font-coolvetica text-white"
                        onClick={() => handleOpenDialog("approve", post.id)}
                    >
                        Approve Post
                    </button>
                </div>
            </div>
            <div className="grid lg:grid-cols-[3fr_24rem] gap-4">
                <div className="w-full bg-white rounded-[.625rem] py-6.5 px-6.5">
                    <PostViewer content={post.contentHtml || ""} />
                </div>
                <PostMetadataForm post={post} />
            </div>

            <ApprovePost
                id={selectedId ?? ""}
                open={dialogType === "approve"}
                onClose={handleCloseDialog}
            />
            <RejectPost
                id={selectedId ?? ""}
                open={dialogType === "reject"}
                onClose={handleCloseDialog}
            />
        </div>
    )
}