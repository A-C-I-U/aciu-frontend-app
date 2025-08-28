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
    variant: "inline" | "block"
}


export const CustomCountdown = ({ targetDate, variant }: CountdownProps) => {

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRendererProps) => {
    if (completed) return (
        <div className="flex gap-6 font-montserrat font-bold text-aciu-border-grey py-2 px-[2.063rem]">
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
                    <div className='bg-aciu-darker-grey flex items-center justify-center rounded-[.313rem] w-[1.875rem] h-[1.875rem] text-white font-coolvetica'>
                        {days}
                    </div>
                    <p className='font-medium font-montserrat text-[.5rem]'>
                        Days
                    </p>
                </div>
                <span className='w-2 h-4 text-black'>:</span>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='bg-aciu-darker-grey flex items-center justify-center rounded-[.313rem] w-[1.875rem] h-[1.875rem] text-white font-coolvetica'>
                        {hours}
                    </div>
                    <p className='font-medium font-montserrat text-[.5rem]'>
                        Hours
                    </p>
                </div>
                <span className='w-2 h-4 text-black'>:</span>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='bg-aciu-darker-grey flex items-center justify-center rounded-[.313rem] w-[1.875rem] h-[1.875rem] text-white font-coolvetica'>
                        {minutes}
                    </div>
                    <p className='font-medium font-montserrat text-[.5rem]'>
                        Minutes
                    </p>
                </div>
            </div>
        )
    }

    if (variant == "inline") {
        return (
            <div className="flex gap-6 font-montserrat font-bold text-aciu-border-grey py-2 px-6 rounded-[.313rem]">
                {[
                    { label: "Days", value: days },
                    { label: "Hours", value: hours },
                    { label: "Minutes", value: minutes },
                    { label: "Seconds", value: seconds },
                ].map(({ label, value }) => (
                    <div>
                        <span className="text-[2rem]">{pad(value)}</span>
                        <div className="text-xs font-medium uppercase">{label}</div>
                    </div>
                ))}
            </div>
        )
    }
   
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};
