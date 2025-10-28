import type { DialogFuncProps } from "@/utils/types";
import { Dialog } from "@mui/material";
import { Copy } from "iconsax-react";
import { enqueueSnackbar } from 'notistack';

export default function ShareProject({
    open,
    onClose,
    link
}: DialogFuncProps & {link: string}) {

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            enqueueSnackbar('Link copied to clipboard!', {
                variant: 'success',
                autoHideDuration: 2000,
            });
        } catch (err) {
            enqueueSnackbar('Failed to copy', { variant: 'error' });
        }
    };
    return (
        <Dialog
            onClose={onClose}
            open={open}
            disableScrollLock
            sx={{
                "& .MuiDialog-paper": {
                    overflow: "hidden",
                    width: {
                        xs: "92%",
                        md: "38.25rem",
                    },
                    margin: "0 auto",
                    borderRadius: "1.25rem"
                },
            }}
        >
            <div
                className="flex flex-col gap-8 w-full relative mx-auto p-7.5"
            >
                <div className="flex flex-col items-start gap-6">
                    <img
                        src="/images/share-icon.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none select-none"
                    />

                    <div className="flex flex-col items-start gap-1.5">
                        <h1 className="text-aciu-border-grey font-bold text-[2rem]">
                            Share Project?
                        </h1>
                        <p className="text-aciu-neutral font-normal">
                            You can copy the link to this project and share with anyone.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="project-link" className="text-sm font-medium text-gray-700">
                            Project Link
                        </label>
                        <div className="truncate relative h-12 flex gap-1 items-center w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                            <input
                                id="project-link"
                                name="project-link"
                                type="text"
                                value={link}
                                className="w-full flex-1 text-ellipsis truncate text-grayscale-100"
                                disabled
                            />
                            <button onClick={() => handleCopy()}>
                                <Copy variant="Bulk" color="#00B686" size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}