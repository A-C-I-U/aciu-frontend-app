import { ArrowDownRight, ArrowUpRight } from "lucide-react"

interface MetricsCardProps {
    title: string,
    price: string,
    timeStamp: string,
    trend: string
}

export const MetricsCard = ({ title, price, timeStamp, trend }: MetricsCardProps) => {
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
                    {trend.includes('-') ? 
                        <span className="flex gap-1 items-center text-aciu-red-normal font-montserrat text-[.625rem]">
                            <ArrowDownRight size={8} color="#FF3B30" fontVariant="bold"/>
                            {trend.replace("-", "")}
                        </span> : 
                        <span className="flex gap-1 items-center text-aciu-red font-montserrat text-[.625rem]">
                            <ArrowUpRight size={8} color="#00CA71" fontVariant="bold" />
                            {trend}
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}