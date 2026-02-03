import type { MetricsCardProps } from "@/utils/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export const MetricsCard = ({ metric }: { metric: MetricsCardProps }) => {
    const { title, price, timeStamp, trend } = metric;

    // Convert trend to string to safely use includes
    const trendString = String(trend);

    return (
        <div className="bg-white rounded-lg py-4 px-6 flex flex-col gap-6 w-full">
            <p className="font-montserrat text-xs uppercase text-copy-400">
                {title}
            </p>
            <div className="flex flex-col gap-4">
                <p className="font-montserrat font-semibold text-[1.75rem] text-copy-500">{price}</p>
                <div className="flex items-center justify-between">
                    <p className="font-montserrat text-xs text-copy-300">
                        {timeStamp}
                    </p>
                    {trendString.includes('-') ?
                        <span className="flex gap-1 items-center text-aciu-red-normal text-[.625rem]">
                            <ArrowDownRight size={8} color="#FF3B30" fontVariant="bold" />
                            {trendString.replace("-", "")}
                        </span> :
                        <span className="flex gap-1 items-center text-aciu-red text-[.625rem]">
                            <ArrowUpRight size={8} color="#00CA71" fontVariant="bold" />
                            {trendString}
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}