
import { FilePreviewCard } from "@/pages/resources/components/FilePreviewCard";
import { formatSize } from "@/utils/helpers";
import { LinearProgress } from "@mui/material";
import { Trash } from "iconsax-react";
import { X } from "lucide-react"

const progressBarSx = {
    width: "100%",
    height: ".313rem",
    backgroundColor: "#E6F8F3",
    borderRadius: ".625rem",
    border: ".7px solid #B0E8D9",
    transition: "all 0.4s ease-in-out",
    "& .MuiLinearProgress-bar": {
    borderRadius: ".625rem",
    backgroundColor: "#00B686",
    },
} 

export const ImageUploaded = ({
    image, loading, progress, onDelete
}: { image: File, loading: boolean, progress: number, onDelete: () => void }) => {
    // const img = URL.createObjectURL(image);
    let size, name = '';
      
    if (image instanceof File) {
        size = formatSize(image.size);
        name = image.name
    }

    return (
        <div className="border border-aciu-dashboard-background py-2 px-2.25 flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <FilePreviewCard file={image} width="w-14.5" height="h-14.5" />
                    <div className="flex flex-col gap-3">
                        <p 
                            className="truncate max-w-3/4 font-semibold text-sm leading-[120%]"
                        >
                            {name}
                        </p>
                        <p className="font-medium text-xs leading-[120%] text-aciu-border-grey">
                            {size}
                        </p>
                    </div>
                </div>
                {loading &&
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={progressBarSx}
                    />
                }
                
            </div>
            {/* Both buttons can be differentiated to the user based on toast feedback */}
            {loading ?
                <button onClick={onDelete}>
                    <X size={20} />
                </button> :
                <button onClick={onDelete}>
                    <Trash size={20} color="#737373" />
                </button>
            }
        </div>
    )
}