import { ArrowToTopRight } from "@solar-icons/react";

export default function MyPublications() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:gap-8">

            </div>
        </div>
    )
}

interface PublicationCardProps { 
    title: string,
    postNumber: string,
    rateOfChange: string
}

export const PublicationCard = ({ 
    title, 
    postNumber, 
    rateOfChange 
}: PublicationCardProps) => {
    const sign = +rateOfChange === 0 ? '' : (+rateOfChange > 0 ? '+' : '-');
    

    return (
        <div className="w-full py-4 px-6 flex flex-col gap-6 rounded-lg bg-white h-[9.688rem]">
            <div className="flex flex-col justify-between">
                <p className="font-montserrat text-copy-400 font-medium uppercase text-xs">
                    {title}
                </p>
                <p className="text-[1.75rem] text-copy-500">
                    {postNumber.padStart(2, '0')} Post(s)
                </p>
            </div>
            <div className="w-full flex justify-end">
                <span className="flex gap-2 justify-center items-center">
                    <ArrowToTopRight color={`${sign === '+' ? 
                        '#03D858' : 
                        (sign === '-' ? 
                        '#e7000b' : 
                        '#737373')}`
                    } size={6} />
                    <span className={`${sign === '+' ? 
                        'text-success-600' : 
                        (sign === '-' ? 
                        'text-red-600' : 
                        'text-aciu-abriba')}`
                    }>                
                        {sign}{rateOfChange}
                    </span>
                </span> 
            </div>
        </div>
    )
}

const publicationStats = [
    {
        title: 'Total Submissions',
        postNumber: '5',
        rateOfChange: '12.5'
    },
    {
        title: 'Published Posts',
        postNumber: '3',
        rateOfChange: '12.5'
    },
     {
        title: 'Pending Approval',
        postNumber: '2',
        rateOfChange: '-12.5'
    },

]