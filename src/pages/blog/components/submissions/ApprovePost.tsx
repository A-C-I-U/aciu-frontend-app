import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { useUpdateSubmissionStatus } from "@/services/hooks/blogs";
import { Dialog, Button, CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function ApprovePost({
    id,
    open,
    onClose
}: DialogFuncProps & { id: string }) {
    const navigate = useNavigate();
    const { mutate, isPending } = useUpdateSubmissionStatus();
    const [confirmed, setConfirmed] = useState(false);

    const handleApprove = () => {
        mutate({ postId: id, status: "Published" }, {
            onSuccess: () => {
                setConfirmed(true);
                enqueueSnackbar("Post approved and published!", { variant: "success" });
            },
            onError: () => {
                enqueueSnackbar("Failed to approve post", { variant: "error" });
                onClose();
            }
        });
    };

    if (confirmed) {
        return (
            <SuccessDialog
                open={open}
                onClose={() => { setConfirmed(false); onClose(); }}
                icon={<MarkIcon />}
                title="Post Approved & Published"
                message="Your review is complete. The post is now live on the community blog."
                primaryAction={{
                    label: "Go back to blog",
                    onClick: () => {
                        onClose();
                        navigate(`/blog`)
                    }
                }}
                secondaryAction={{
                    label: "View Post",
                    onClick: () => {
                        onClose();
                        navigate(`/blog/posts/${id}`)
                    }
                }}
            />
        );
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    padding: "2rem",
                    borderRadius: "1.25rem",
                    width: "100%",
                    maxWidth: "25rem"
                }
            }}
        >
            <div className="flex flex-col items-center gap-6 text-center">
                <MarkIcon />
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold font-coolvetica">Approve Post?</h2>
                    <p className="text-aciu-abriba">Are you sure you want to approve and publish this post? It will be live immediately.</p>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleApprove}
                        disabled={isPending}
                        sx={{
                            bgcolor: "#00B686",
                            borderRadius: "0.75rem",
                            height: "3.5rem",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#00966e" }
                        }}
                    >
                        {isPending ? <CircularProgress size={24} color="inherit" /> : "Yes, Approve & Publish"}
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={onClose}
                        sx={{
                            borderColor: "#E5E5E5",
                            color: "#3E3E3E",
                            borderRadius: "0.75rem",
                            height: "3.5rem",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}