import { formatSize, getExtension, getExtensionFromUrl } from "@/utils/helpers";
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
    image, progress, onDelete
}: { image: File, progress: number, onDelete: () => void }) => {
    // const img = URL.createObjectURL(image); // NOTE: image here is received as a file, if received as a url, transform
    let extension, size, name = '';
      
    if (image instanceof File) {
        size = formatSize(image.size);
        name = image.name;
        extension = getExtension(image);
    } else {
        extension = getExtensionFromUrl(image)
    }


    return (
        <div className="border border-aciu-dashboard-background rounded-[.625rem] py-2 px-2.25 flex flex-col gap-2.25">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center justify-center w-22 h-22 rounded-lg border border-aciu-dashboard-background bg-white">
                        <p className="text-sm uppercase">
                            {extension}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="truncate max-w-40 font-semibold text-sm leading-[120%]">
                            {name}
                        </p>
                        <p className="font-medium text-xs leading-[120%] text-aciu-border-grey">
                            {size}
                        </p>
                    </div>
                </div>
               
                {/* Both buttons can be differentiated to the user based on toast feedback */}
                {progress < 100 ?
                    <button onClick={onDelete} type="button">
                        <X size={20} />
                    </button> :
                    <button onClick={onDelete} type="button">
                        <Trash size={20} color="#737373" />
                    </button>
                }
            </div>
            {progress < 100 &&
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={progressBarSx}
                />
            }    
        </div>
    )
}