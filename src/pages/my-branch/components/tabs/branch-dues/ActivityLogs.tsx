import type { ActivityLog } from "@/utils/types";
import { EmptyRecords } from "../../EmptyStates";
import { Avatar } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { formatDate } from "date-fns";


export default function ActivityLogs({ logs }: { logs: ActivityLog[] }) {
    return (
        <div className="flex flex-col gap-10">
            {logs.length > 0 ? (
                logs.map((log) => (
                <div key={log.id} className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Avatar src={DummyProfile} className="rounded-[4.8rem]" />
                        <div className="flex flex-col gap-1">
                            <span className="font-medium">{log.actor} <span className="text-sm text-gray-500 lowercase">{log.action}</span></span>
                            <span className="text-xs text-gray-400">
                                {formatDate(log.timestamp, "dd MMM yyyy h:mm a")}
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