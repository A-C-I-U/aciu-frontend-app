import { Divider } from "@mui/material"
import { NotificationSection } from "./NotificationSection"

export default function NotificationCategory({
    heading, subtext, section
}: {
    heading: string,
    subtext: string,
    section: any
}) {
    return (
        <div className="flex flex-col gap-6 lg:gap-11 py-4">
            <div className="flex flex-col gap-2">
                <p className="font-semibold">{heading}</p>
                <p className="text-aciu-abriba">{subtext}</p>
            </div>

            <Divider orientation="horizontal" className="text-[#F4F4F4]" />

            <NotificationSection {...section} />
            <Divider orientation="horizontal" className="text-[#F4F4F4]" />
        </div>
    )
}