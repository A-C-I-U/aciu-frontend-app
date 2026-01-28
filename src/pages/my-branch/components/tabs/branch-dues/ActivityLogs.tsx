import { EmptyRecords } from "../../EmptyStates";
import { Avatar } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { formatDate } from "date-fns";
import { useDuesActivityLog } from "@/services/hooks/dues";


export default function ActivityLogs({ id }: { id: string }) {
    const { data: logs, isLoading } = useDuesActivityLog(id);

    return (
        <div className="flex flex-col gap-10">
            {isLoading && 
                <div className="flex flex-col gap-10">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className="flex flex-col gap-4 animate-pulse" key={index}>
                                <div className="flex gap-2 items-center">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                                    <div className="flex flex-col gap-1 flex-1">
                                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                                        <div className="h-3 bg-gray-300 rounded w-1/2 mt-1" />
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
            }
            {logs?.details && logs?.details.length > 0 ? (
                logs?.details.map((detail, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Avatar src={DummyProfile} className="rounded-[4.8rem]" />
                        <div className="flex flex-col gap-1">
                            <span className="font-medium">{detail.userName} <span className="text-sm text-gray-500 lowercase">updated the <span className="font-medium">{detail.field}</span>from<span className="font-medium">{detail.oldValue}</span>to<span className="font-medium">{detail.newValue}</span></span></span>
                            <span className="text-xs text-gray-400">
                                {formatDate(detail.createdAt, "dd MMM yyyy h:mm a")}
                            </span>
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <EmptyRecords />
            )}
        </div>

    )
}