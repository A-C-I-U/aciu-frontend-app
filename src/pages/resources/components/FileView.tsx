import type { FileViewProps } from "@/utils/types";
import { useState } from "react";
import { formatSize, getExtension } from "@/utils/helpers";
import ViewResource from "./ViewResource";

export default function FileView({
    file,
    name,
}: FileViewProps) {
    const [fileOpen, setFileOpen] = useState(false);

    const extension = getExtension(file);
    const size = formatSize(file.size);

    const handleOpen = () => {
        setFileOpen(true)
    }

    const handleClose = () => {
        setFileOpen(false)
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className="cursor-pointer
                    rounded-[1.25rem]
                    flex items-center justify-center
                    bg-card-200
                    transition-colors duration-300
                    px-5 py-7
                    md:px-9 md:py-12
                    hover:bg-aciu-green-normal
                    group"
                >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="
                        flex items-center justify-center
                        border rounded-md
                        w-22 h-22
                        border-aciu-dashboard-background
                        bg-white
                    ">
                        <p className="extension text-sm 
                            uppercase text-aciu-abriba
                            group-hover:text-aciu-abriba"
                        >
                            {extension}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">

                        <p className="text-sm font-semibold text-aciu-darker-grey
                            group-hover:text-white">
                            {name}
                        </p>

                        <p className="size text-xs font-medium text-aciu-border-grey
                            group-hover:text-aciu-dark-grey">
                            {size}
                        </p>

                    </div>

                </div>
            </button>
            <ViewResource
                open={fileOpen}
                onClose={handleClose}
            />
        </>
    )
}