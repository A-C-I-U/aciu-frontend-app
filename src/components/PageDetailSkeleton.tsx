import { Divider } from "@mui/material";

export default function PageDetailSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div
                className="border-b border-b-aciu-dark-grey 
                pb-4 px-3.5 lg:px-6.5 flex flex-col gap-4 lg:items-center
                 h-20 animate-pulse"
            >
                <div className="flex flex-col w-full h-full">
                    <div className="h-10 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
            <div
                className={`px-3.5 lg:px-6.5 project-gallery min-h-78 md:min-h-80 count-4`}>
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="h-80 bg-gray-200 rounded w-full mb-2"></div>
                    ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="order-2 lg:order-1 flex flex-col gap-4">
                    <div className="flex gap-4 md:gap-8 w-full mx-auto px-3.5 lg:px-6.5">
                        <span className="inline-block h-10 bg-gray-200 rounded w-full mb-2"></span>
                        <span className="inline-block h-10 bg-gray-200 rounded w-full mb-2"></span>
                    </div>
                    <Divider flexItem orientation="horizontal" />
                    <div className="px-2.5 md:px-3.5 lg:px-6.5 mt-4">
                       <div className="h-80 bg-gray-200 rounded w-full mb-2"></div>
                    </div>
                </div>
                <div className="mx-3.5 lg:mr-3.5 lg:mx-0 order-1 lg:order-2">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="flex gap-4 flex-col mb-4">
                            <span className="inline-block h-10 bg-gray-200 rounded w-2/3 mb-2"></span>
                            <span className="inline-block h-10 bg-gray-200 rounded w-full mb-2"></span>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}