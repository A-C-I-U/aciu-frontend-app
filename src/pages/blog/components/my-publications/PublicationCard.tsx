import type { PublicationCardProps } from "@/utils/types";
import { ArrowTopRightIcon } from "@/components/Icons";

export const PublicationCard = ({ 
    title, 
    postNumber, 
    rateOfChange 
}: PublicationCardProps) => {
    const sign = +rateOfChange === 0 ? '' : (+rateOfChange > 0 ? '+' : '-');
    
    return (
        <div className="w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white w-full h-[9.688rem]">
            <div className="flex flex-col justify-between h-full">
                <p className="font-montserrat text-copy-400 font-medium uppercase text-xs">
                    {title}
                </p>
                <p className="font-montserrat font-semibold text-[1.75rem] text-copy-500">
                    {postNumber.padStart(2, '0')} Post(s)
                </p>
            </div>
            <div className="w-full flex justify-end">
                <span className="flex gap-2 justify-center items-center">
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
                    <span className={`font-montserrat text-[.625rem] ${sign === '+' ? 
                        'text-success-600' : 
                        (sign === '-' ? 
                        'text-red-600' : 
                        'text-aciu-abriba')}`
                    }>                
                        {rateOfChange}
                    </span>
                </span> 
            </div>
        </div>
    )
}
