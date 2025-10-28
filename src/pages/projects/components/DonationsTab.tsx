import { DonateIcon } from "@/components/Icons"
import { timeAgo } from "@/utils/helpers"
import type { ProjectDonation } from "@/utils/types"

export const DonationsTab = ({
    donations
}: { 
    donations: ProjectDonation[]
}) => {
    return (
        <div className="flex flex-col gap-6.5">
            {donations.map(({time, name, amount}, index) => (
                <>
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full bg-aciu-light-grey w-10 h-10 flex items-center justify-center">
                                <DonateIcon />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-xs md:text-sm text-aciu-abriba">
                                    {name} Donated
                                </p>
                                <p className="font-semibold text-xs text-aciu-border-grey">
                                    {amount}
                                </p>
                            </div>
                        </div>
                        <p className="text-xs md:text-sm italic">
                            {timeAgo(time)}
                        </p>
                    </div>
                     <hr className="w-full border-t-[.5px] text-aciu-dark-grey" />
                </>
            ))}
            {/* Add see more button here */}
        </div>
    )
}