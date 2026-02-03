import { EmptyRecords } from "@/components/EmptyStates";
import { Avatar } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { useDuesActivityLog } from "@/services/hooks/dues";
import { formatActivityLogs } from "@/utils/helpers";
import { formatDate } from "date-fns";


export default function ActivityLogs({ id }: { id: string }) {
    const { data, isLoading } = useDuesActivityLog(id);

    const logs = formatActivityLogs(data?.details || [])

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
            {logs && logs.length > 0 ? (
                logs.map((detail, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Avatar src={DummyProfile} className="rounded-[4.8rem]" />
                        <div className="flex flex-col gap-1.5 md:gap-1">
                            <p className="text-xs md:text-sm leading-default text-aciu-abriba">
                                <span className="font-medium text-aciu-border-grey">{detail.userName}</span>
                                {' '}updated{' '}
                                <span className="font-medium text-aciu-border-grey">{detail.displayField}</span>
                                {' '}from{' '}
                                <span className="font-medium text-aciu-border-grey">"{detail.formattedOldValue}"</span>
                                {' '}to{' '}
                                <span className="font-medium text-aciu-border-grey">"{detail.formattedNewValue}"</span>
                            </p>
                            <span className="text-[.625rem] md:text-xs leading-default text-aciu-abriba">
                                {formatDate(detail.createdAt, "dd MMMM yyyy h:mm a")}
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