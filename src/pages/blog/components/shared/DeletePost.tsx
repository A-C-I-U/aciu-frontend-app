import { TrashIcon } from "@/components/Icons";
import type { DialogFuncProps } from "@/utils/types";
import { Dialog } from "@mui/material";

export default function DeletePost({
    open,
    onClose,
    handleDelete
}: DialogFuncProps & { handleDelete: () => void}) {
    return (
        <Dialog
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "1.25rem"
                    }
                }
            }}
            onClose={onClose} 
            open={open}
            disableScrollLock
        >
            <div
                className="p-7.5 w-125 flex flex-col gap-5.5 rounded-[1.25rem]">
                <TrashIcon />
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-coolvetica text-aciu-border-grey font-bold">
                        Delete Post?
                    </h3> 
                    <p className="text-aciu-neutral font-montserrat">
                        Are you sure you want to permanently delete these selected posts? 
                        This action cannot be undone.
                    </p>
                </div>
                <div className="flex gap-5.25 items-center">
                    <button
                        className="p-4 gap-2 rounded-xl 
                        bg-aciu-green-normal text-white 
                        font-coolvetica w-full"
                        onClick={handleDelete}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="p-4 gap-2 rounded-xl 
                        bg-inherit text-aciu-border-grey
                        font-coolvetica w-full border border-aciu-dashboard-background"
                        onClick={onClose}
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </Dialog>
    )
}