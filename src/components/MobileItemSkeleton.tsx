import { Divider } from "@mui/material";

export default function MobileItemSkeleton() {
    return (
        <div className="w-full p-4.5 flex flex-col gap-4 items-center rounded-[.625rem] border border-grayscale-200 shadow-aciu-bg-grey">
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-full flex flex-col gap-4">
                    {index > 1 && <Divider flexItem className="text-aciu-dark-grey" />}

                    <div className="flex justify-between w-full items-center px-3">
                        <div className="h-5 w-20 bg-gray-200 rounded ">{""}</div>

                        <div className="h-5 w-20 bg-gray-200 rounded">{""}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}