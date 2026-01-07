import Countdown from 'react-countdown';

interface CountdownRendererProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    completed: boolean
}

interface CountdownProps {
    targetDate: Date,
    variant: "inline" | "block",
    className?: string
}


export const CustomCountdown = ({ targetDate, variant, className }: CountdownProps) => {

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRendererProps) => {
    if (completed) return (
        <div className={`flex gap-6 font-montserrat font-bold text-aciu-border-grey py-2 px-8.5 ${className}`}>
            <div>
                <span className="text-[2rem]">00</span>
                <div className="text-xs font-medium uppercase">Days</div>
            </div>
            <div>
                <span className="text-[2rem]">00</span>
                <div className="text-xs font-medium uppercase">Hours</div>
            </div>
            <div>
                <span className="text-[2rem]">00</span>
                <div className="text-xs font-medium uppercase">Minutes</div>
            </div>
            <div>
                <span className="text-[2rem]">00</span>
                <div className="text-xs font-medium uppercase">Seconds</div>
            </div>
        </div>
    )

    const pad = (num: number) => String(num).padStart(2, '0');

    if (variant === "block") {
        return (
            <div className='flex gap-1 items-center'>
                <div className='flex flex-col gap-1 items-center'>
                    <p className='bg-aciu-darker-grey flex items-center justify-center rounded-[.313rem] w-7.5 h-7.5 text-white font-coolvetica'>
                        {days}
                    </p>
                    <p className='font-medium font-montserrat text-[.5rem]'>
                        Days
                    </p>
                </div>
                <span className='w-2 h-4 text-black'>:</span>
                <div className='flex flex-col gap-1 items-center'>
                    <p className='bg-aciu-darker-grey flex items-center justify-center rounded-[.313rem] w-7.5 h-7.5 text-white font-coolvetica'>
                        {hours}
                    </p>
                    <p className='font-medium font-montserrat text-[.5rem]'>
                        Hours
                    </p>
                </div>
                <span className='w-2 h-4 text-black'>:</span>
                <div className='flex flex-col gap-1 items-center'>
                    <p className='bg-aciu-darker-grey flex items-center justify-center rounded-[.313rem] w-7.5 h-7.5 text-white font-coolvetica'>
                        {minutes}
                    </p>
                    <p className='font-medium font-montserrat text-[.5rem]'>
                        Minutes
                    </p>
                </div>
            </div>
        )
    }

    if (variant == "inline") {
        return (
            <div className="flex gap-6 font-montserrat font-bold text-aciu-border-grey py-2 px-3 lg:px-6 rounded-[.313rem]">
                {[
                    { label: "Days", value: days },
                    { label: "Hours", value: hours },
                    { label: "Minutes", value: minutes },
                    { label: "Seconds", value: seconds },
                ].map(({ label, value }, key) => (
                    <div key={key}>
                        <span className="text-[2rem]">{pad(value)}</span>
                        <p className="text-xs font-medium uppercase">{label}</p>
                    </div>
                ))}
            </div>
        )
    }
   
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};
