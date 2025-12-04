import { Document } from "iconsax-react"

export const EmptyMemberActivity = () => {
    return (
        <div className="flex flex-col gap-2">
            <Document width={32} height={32} />
            <p className="font-semibold text-aciu-border-grey">
                No Member Activity Yet
            </p>
            <p className="text-sm text-aciu-abriba">
                Member has not had activity on the platform.
            </p>
        </div>
    )
}


export const EmptyPaymentsState = () => {
    return (
        <div className="flex flex-col gap-2">
            <Document width={32} height={32} />
            <p className="font-semibold text-aciu-border-grey">
                No Payments Found Yet
            </p>
            <p className="text-sm text-aciu-abriba">
                Member has not made any payments on the platform.
            </p>
        </div>
    )
}