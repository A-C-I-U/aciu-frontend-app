import type { DialogFuncProps } from "@/utils/types";
import { Dialog } from "@mui/material";
import type React from "react";
import { ScrollLock } from "./ScrollLock";

interface ActionButton {
    label: string,
    onClick: () => void,
    isPending?: boolean
}

interface ConfirmModalProps extends DialogFuncProps {
    icon: React.ReactNode,
    title: string,
    message: React.ReactNode,
    confirmAction: ActionButton,
    cancelAction: ActionButton,
}

export function ConfirmModal({
    open,
    onClose,
    icon,
    title,
    message,
    confirmAction,
    cancelAction
}: ConfirmModalProps) {
    return (
        <>
            <ScrollLock open={open} />
            <Dialog
                open={open}
                onClose={onClose}
                disableScrollLock
                sx={{
                    "& .MuiDialog-paper": {
                        overflow: "hidden",
                        width: { xs: "92%", md: "31.25rem" },
                        margin: "0 auto",
                        borderRadius: "1.25rem",
                    },
                }}
            >
                <div className="flex flex-col p-7.5 gap-5.5">
                    {icon}
                    <div className="flex flex-col gap-1">
                        <h1 className="success-modal-title leading-[130%] tracking-[5%]">{title}</h1>
                        <p className="text-aciu-neutral leading-[160%]">{message}</p>
                    </div>

                    <div className="flex items-center gap-5.5">
                        <button
                            className="btn btn-danger-outline w-full flex items-center justify-center h-12"
                            onClick={confirmAction.onClick}
                            disabled={confirmAction.isPending}
                        >
                            {confirmAction.isPending ? "Please wait..." : confirmAction.label}
                        </button>

                        <button
                            className="btn btn-secondary w-full h-12"
                            onClick={cancelAction.onClick}
                            disabled={confirmAction.isPending}
                        >
                            {cancelAction.label}
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
