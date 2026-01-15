import TableSkeleton from "@/components/TableSkeleton";
import { Skeleton } from "@mui/material";

export default function NationalAdminSkeleton() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white h-39 animate-pulse"
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid lg:grid-cols-[3fr_1fr] items-stretch gap-4">
                <div className="bg-white rounded-lg py-5.5 flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-7 justify-between lg:items-center px-8">
                        <Skeleton variant="text" width="20%" height={25} sx={{ mt: 2 }} />
                        <div className="flex items-center gap-4">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        </div>
                    </div>
                    <div className="px-8">
                        <Skeleton 
                            variant="rectangular" 
                            width="100%" 
                            height={350}
                            sx={{ borderRadius: '12px' }}
                        />
                    </div>

                </div>
                <div className="bg-white rounded-lg px-6 py-4.5 flex flex-col gap-6">
                    <Skeleton variant="text" width="20%" height={25} sx={{ mt: 2 }} />
                    <div className="flex flex-col gap-4">
                        {([1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                        )))}
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-6 py-4 lg:px-4">
                <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between lg:items-center">
                    <h5 className="text-lg lg:text-xl line-height-120 text-aciu-border-grey">
                        Withdrawal Requests
                    </h5>
                    <div className="flex items-center gap-4">
                        <div className="h-4 bg-gray-200 rounded w-13 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-13 mb-2"></div>
                    </div>
                </div>
                <TableSkeleton />
            </div>
        </div>
    )
}