import { Divider } from "@mui/material"
import { NotificationSection } from "./NotificationSection"
import type { NotificationSectionProps } from "@/utils/types"

export default function NotificationCategory({
    heading, subtext, section
}: {
    heading: string,
    subtext: string,
    section: NotificationSectionProps
}) {
    return (
        <div className="flex flex-col gap-6 lg:gap-11 py-4">
            <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm lg:text-base">{heading}</p>
                <p className="text-aciu-abriba text-sm lg:text-base">{subtext}</p>
            </div>

            <Divider orientation="horizontal" className="text-aciu-white-dark" />

            <NotificationSection 
                title={section.title}
                description={section.description}
                options={section.options}
            />
            <Divider orientation="horizontal" className="text-aciu-white-dark" />
        </div>
    )
}