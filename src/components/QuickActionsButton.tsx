import { NavLink } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import { useState } from "react";

const defaultDialogSx = {
    "& .MuiDialog-paper": {
        overflow: "hidden",
        minWidth: { xs: "16.375rem", sm: "60%" },
        width: "auto",
        margin: "0 auto",
        borderRadius: "1.25rem",
        maxHeight: "none",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
    }
};

export const QuickActionsButtons = ({
    quickActions
}: { quickActions: { label: string, path: string }[]}) => {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const [open, setOpen] = useState(false);

    return (
        <>
            {isMobile ? 
            <>
                <button
                    onClick={() => setOpen(true)}
                    className="w-full flex justify-between items-center p-0 bg-white rounded-2xs"
                >
                    <span className="font-semibold text-aciu-abriba leading-[120%]">
                        Quick Actions
                    </span>
                    <ArrowForwardIosRoundedIcon sx={{ width: "1rem", height: "1rem", color: "#3E3E3E" }} />
                </button>
                <Dialog open={open} onClose={() => setOpen(false)} disableScrollLock={false} sx={defaultDialogSx}>
                <DialogContent 
                    sx={{
                        paddingY: "1.125rem",
                        paddingX: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem"
                    }}
                >
                    <QuickActionsContent quickActions={quickActions} />
                </DialogContent>
            </Dialog>
            </>
            :
                <QuickActionsContent quickActions={quickActions}/>
            }
        </>
    )
}

const QuickActionsContent = ({
    quickActions
}: { quickActions: { label: string, path: string }[]}) => {
    return (
        <>
            <p className="font-semibold leading-[120%] text-aciu-border-grey">
                Quick Actions
            </p>
            <div className="flex flex-col gap-4">
                {quickActions.map(({ label, path }, index) => (
                    <NavLink
                        key={index}
                        to={path}
                            className={[
                                "flex justify-between items-center rounded-sm py-2.5 px-3.5 border transition-colors",
                                index % 2 === 0
                                ? "bg-accent-100 border-accent-300"
                                : "bg-primary-100 border-primary-300"
                            ].join(" ")}>
                            <>
                                <span className="font-montserrat text-xs text-aciu-border-grey">
                                    {label}
                                </span>
                                <ArrowForwardIosRoundedIcon
                                    sx={{
                                        width: "1rem",
                                        height: "1rem",
                                        color: "#3E3E3E"
                                    }}
                                />
                            </>
                    </NavLink>
                ))}
            </div>
        </>
    )
}