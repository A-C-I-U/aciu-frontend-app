import { Document } from "iconsax-react"

export const EmptyMemberActivity = () => {
    return (
        <div className="flex flex-col gap-2 h-full w-full min-h-80 justify-center items-center">
            <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No Member Activity Yet
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba max-w-70 text-center">
                Member has not had activity on the platform.
            </p>
        </div>
    )
}


export const EmptyPaymentsState = () => {
    return (
        <div className="flex flex-col gap-2 h-full min-h-80 w-full justify-center items-center">
             <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No Payments Found Yet
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba max-w-70 text-center">
                Member has not made any payments on the platform.
            </p>
        </div>
    )
}

export const EmptyRecords = () => {
    return (
        <div className="flex flex-col gap-2 h-full min-h-80 w-full items-center">
            <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No Payments Found Yet
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba  max-w-70 text-center">
                There are no records available at the moment. Once activities are logged, they will appear here.
            </p>
        </div>
    )
}