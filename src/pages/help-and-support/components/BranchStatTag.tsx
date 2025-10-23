import type { Icon } from "iconsax-react"

export const StatTag = ({ icon: Icon, stat }: { icon: Icon, stat: string}) => {
    return (
        <div className="flex items-center gap-2.5 px-4 py-2.5 border border-aciu-light-grey rounded-[0.625rem]">
            <Icon size={24} color="#00B686" />
            <p className="line-height-120 text-aciu-abriba">
                {stat}
            </p>
        </div>
    )
}