import type { DialogFuncProps } from "@/utils/types";
import { Dialog } from "@mui/material";
import type React from "react";
import { ScrollLock } from "./ScrollLock";

interface ActionButton {
    label: string,
    onClick: () => void
}

interface SuccessDialogProps extends DialogFuncProps {
    icon: React.ReactNode,
    title: string,
    message: React.ReactNode,
    primaryAction: ActionButton,
    secondaryAction?: ActionButton,
    className?: string,
}

export function SuccessDialog({
    open,
    onClose,
    icon,
    title,
    message,
    className = "",
    primaryAction,
    secondaryAction
}: SuccessDialogProps) {
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
                        overflowY: "hidden",
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
                        <button className={`btn btn-primary ${className}`} onClick={primaryAction.onClick}>
                            {primaryAction.label}
                        </button>

                        {secondaryAction && (
                            <button
                                className={`btn btn-secondary ${className}`}
                                onClick={secondaryAction.onClick}
                            >
                                {secondaryAction.label}
                            </button>
                        )}
                    </div>
                </div>
            </Dialog>
        </>
    );
}
