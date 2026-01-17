
import type { StatsCardProps } from "@/utils/types";
import { ArrowTopRightIcon } from "@/components/Icons";

export const StatsCard = ({ 
    title, 
    number,
    itemLabel,
    currency,
    description,
    rateOfChange
}: StatsCardProps) => {
    const hasRate = typeof rateOfChange === 'string';
    const numericRate = hasRate ? Number(rateOfChange) : NaN;
    const isValidRate = Number.isFinite(numericRate);

    const sign: '' | '+' | '-' =
        !isValidRate || numericRate === 0
            ? ''
            : numericRate > 0
            ? '+'
            : '-';

    const displayRate = isValidRate ? Math.abs(numericRate) : '';
    
    return (
        <div className="w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white h-39">
            <div className="flex flex-col justify-between h-full">
                <p className="font-montserrat text-copy-400 font-medium uppercase text-xs">
                    {title}
                </p>
                <p className="font-montserrat font-semibold text-[1.75rem] text-copy-500">
                    {currency}{String(number).padStart(2, '0')} {itemLabel}
                </p>
            </div>
            <div className={`w-full flex ${description ? "justify-between" : "justify-end"}`}>
                <span className="text-xs leading-[140%] uppercase text-copy-300">
                    {description}
                </span>
                {hasRate &&
                    <span className="flex gap-1.5 justify-center items-center">
                        {!(+rateOfChange === 0) && 
                            <ArrowTopRightIcon 
                                color={`${sign === '+' ? 
                                    '#03D858' : 
                                    (sign === '-' ? 
                                    '#e7000b' : 
                                    '#737373')}`
                                }  
                                className={`${sign === '-' ? 'rotate-90' : ''}`}
                                width={6} 
                                height={6}
                            />
                        }
                        <span className={`text-[.625rem] leading-[120%] ${sign === '+' ? 
                            'text-success-600' : 
                            (sign === '-' ? 
                            'text-red-600' : 
                            'text-aciu-abriba')}`
                        }>                
                            {sign} {displayRate}%
                        </span>
                    </span>
                }
            </div>
        </div>
    )
}