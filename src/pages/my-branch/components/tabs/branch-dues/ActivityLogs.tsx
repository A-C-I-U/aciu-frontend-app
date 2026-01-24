import { EmptyRecords } from "../../EmptyStates";
import { Avatar } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { formatDate } from "date-fns";
import { useDuesActivityLog } from "@/services/hooks/dues";


export default function ActivityLogs({ id }: { id: string }) {
    const { data: logs } = useDuesActivityLog(id);

    return (
        <div className="flex flex-col gap-10">
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