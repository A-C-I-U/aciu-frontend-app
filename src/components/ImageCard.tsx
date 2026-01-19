import { DocumentDownload } from "iconsax-react";

export const ImageCard = ({ imageUrl }: { imageUrl: string }) => {

    const handleDownload = () => {
        window.open(imageUrl, "_blank", "noopener,noreferrer");
    };


    return (
        <div className="bg-card-200 border border-aciu-dashboard-background py-6 px-4 rounded-2xs w-full">
            <div className="flex gap-2 items-center">
                <div className="border-[.7px] border-aciu-dashboard-background rounded-2xs bg-white size-12 flex items-center justify-center align-middle">
                    <span className="text-xs leading-[120%] text-aciu-abriba">
                        IMG
                    </span>
                </div>
                <div className="flex-1 w-full">
                    <p className="font-semibold leading-[120%] text-sm">
                        Project Image
                    </p>
                </div>
                <button
                    onClick={handleDownload}
                    title="Download image"
                    type="button"
                >
                    <DocumentDownload size={24} color="#00B686" />
                </button>
            </div>
        </div>
    )
}