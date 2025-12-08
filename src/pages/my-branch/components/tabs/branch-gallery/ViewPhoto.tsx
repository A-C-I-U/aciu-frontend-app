import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import type { Img } from ".";



export default function ViewPhoto({
    open, onClose, image
}: DialogFuncProps & { image: Img | null}) {

    if (!image) return null;

    const { name, url, category } = image;

    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section">
                <ShellHeader title="View Image" onClose={onClose} />
                <div className="flex flex-col h-full overflow-hidden">
                    <img src={url} alt="" className="w-full object-cover h-auto px-5.5 max-h-75.75" />
                    <div className="resources-modal-body">
                        <Divider className="flex shrink-0" />
                        <div className="flex flex-col gap-3.75">
                            <DisabledInput
                                label="File Name"
                                value={name}
                            />
                            <DisabledInput
                                label="Category"
                                value={category}
                            />
                        </div>
                    </div>
                    <div className="py-5.5 px-10.5 resource-buttons-container">
                        <button className="btn btn-danger-outline">
                            Delete Upload
                        </button>
                    </div>
                </div>
            </div>
        </ShellModal>
    )
}

export const DisabledInput = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className="flex flex-col gap-2 items-start w-full">
            <label className="text-sm font-medium text-aciu-border-grey">
                {label}
            </label>
            <input 
                type="text" 
                value={value} 
                className="pointer-events-none text-sm font-medium text-aciu-abriba leading-[100%] py-4 px-3 border border-aciu-card-grey rounded-2xs w-full bg-aciu-bg-grey" 
            />
        </div>
    )
}