import MobileItemSkeleton from "@/components/MobileItemSkeleton";
import TableSkeleton from "@/components/TableSkeleton";
import { Divider, useMediaQuery } from "@mui/material";

export default function TableChartSkeleton() {
    const isMedium = useMediaQuery("(max-width: 1250px)");
    return (
        <div className="flex flex-col gap-6 w-full animate-pulse">
            <div className="bg-white rounded-lg flex flex-col gap-6 min-w-0">
                <div className="flex flex-col pt-5.5 lg:flex-row gap-6.75 lg:gap-7 justify-between lg:items-center px-4 lg:px-8">
                    <div className="h-6 w-48 bg-gray-200 rounded" />

                    <div className="hidden lg:flex gap-2">
                        <div className="h-9 w-20 bg-gray-200 rounded-md" />
                        <div className="h-9 w-24 bg-gray-200 rounded-md" />
                    </div>
                </div>

                <Divider sx={{ borderColor: "#EEECF6" }} />

                <div className="flex lg:hidden gap-2 px-4 lg:px-8">
                    <div className="h-9 w-20 bg-gray-200 rounded-md" />
                    <div className="h-9 w-24 bg-gray-200 rounded-md" />
                </div>
                <div className="px-4 lg:px-8">
                    <div className="overflow-x-auto">
                        <div className="min-w-125 md:min-w-0 mb-4">
                            <div className="h-64 w-full bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-6 py-4 lg:px-4">
                <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between lg:items-center">
                    <div className="h-8 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="flex items-center gap-4">
                        <div className="h-4 bg-gray-200 rounded w-13 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-13 mb-2"></div>
                    </div>
                </div>
                {isMedium ?
                    <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((index) => (
                            <MobileItemSkeleton key={index}/>
                        ))}
                    </div> :
                    <TableSkeleton />
                }               
            </div>
        </div>
    )
}