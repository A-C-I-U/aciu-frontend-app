import { MarkIcon } from "@/components/Icons";
import type { DialogFuncProps } from "@/utils/types";
import { Button, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ApprovePost({
    id,
    open,
    onClose
}: DialogFuncProps & { id: string }) {
    const navigate = useNavigate();
    
    return (
        <Dialog
            onClose={() => onClose()}
            open={open}
            // onTransitionExited={}
            disableScrollLock
            sx={{
                "& .MuiDialog-paper": {
                    overflow: "hidden",
                    width: {
                        xs: "92%",
                        md: "31.25rem",
                    },
                    margin: "0 auto",
                    borderRadius: "1.25rem"
                },
            }}
        >
        <div className="w-full h-full p-7.5 flex flex-col gap-5.5">
            <div className="flex flex-col items-start gap-6 w-full h-full">
                <MarkIcon />
                <div className="flex flex-col items-start gap-1.5">
                    <h1 className="font-coolvetica text-aciu-border-grey font-bold text-2xl">
                        Post Approved & Published
                    </h1>
                    <p className="font-montserrat text-aciu-neutral font-normal">
                        Your review is complete. The post is now live on the community blog.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5.5">
                <Button
                    sx={{
                        color: 'white',
                        fontSize: '.75rem',
                        backgroundColor: '#00B686',
                        borderRadius: '.75rem',
                        padding: '1rem',
                        boxShadow: '0px 1px 2px 0px #0D0D120A',
                        textTransform: 'none',
                        minWidth: "12.5rem"
                    }}
                    className="flex gap-2 items-center min-w-49"
                    onClick={() => onClose()}
                >
                    <span className="font-coolvetica text-base">
                        Go back to blog
                    </span>
                </Button>
                <Button
                    sx={{
                        color: '#3E3E3E',
                        fontSize: '.75rem',
                        backgroundColor: 'inherit',
                        borderRadius: '.75rem',
                        border: "1px solid #E5E5E5",
                        padding: '1rem',
                        boxShadow: '0px 1px 2px 0px #0D0D120A',
                        textTransform: 'none',
                        minWidth: "12.5rem"
                    }}
                    className="flex gap-2 items-center min-w-49"
                    onClick={() => {
                        navigate(`/blogs/${id}`)
                    }}
                >
                    <span className="font-coolvetica text-base">
                        View Post
                    </span>
                </Button>
            </div>
        </div>
    </Dialog>
    )
}