import { Document } from "iconsax-react"

export const EmptyPage = ({
    label
}: { label?: string }) => {
    return (
        <div className="flex flex-col gap-2 h-full min-h-120 w-full items-center justify-center">
            <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No {label} Found
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba  max-w-70 text-center">
                There are no {label} available at the moment.
            </p>
        </div>
    )
}