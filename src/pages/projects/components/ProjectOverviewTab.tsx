import type { ProjectOverviewProps } from "@/utils/types"
import { Dot } from "lucide-react"

export const ProjectOverviewTab = ({
    description, 
    value, 
    impact, 
    scope
}: ProjectOverviewProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <h2 className="line-height-120 text-aciu-border-grey">
                    Project Description
                </h2>
                <p className="text-xs text-aciu-abriba leading-6.5">
                    {description}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="line-height-120 text-aciu-border-grey">
                    Why It Matters
                </h2>
                <p className="text-xs text-aciu-abriba leading-6.5">
                    {value}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="line-height-120 text-aciu-border-grey">
                    Scope
                </h2>
                {scope.map(({ type, content}, index) => {
                    if (type === "list") {
                        return (
                            <ul className="flex flex-col gap-3" key={index}>
                                {content.map((item, index) => (
                                    <li 
                                        key={index}
                                        className="text-xs text-aciu-abriba flex items-center"
                                    >
                                        <Dot size={10} color="#737373"/> {item}
                                    </li>
                                ))}
                            </ul>
                        )
                    }

                    return (
                        <p key={index} className="text-xs text-aciu-abriba leading-6.5">
                            {content}
                        </p>
                    )
                })}
                
            </div>


            <div className="flex flex-col gap-4">
                <h2 className="line-height-120 text-aciu-border-grey">
                    Impact
                </h2>
                <div>
                    {impact.map(({ type, content}, index) => {
                        if (type === "list") {
                            return (
                                <ul className="flex flex-col gap-3" key={index}>
                                    {content.map((item, index) => (
                                        <li 
                                            key={`${index}-${item.charAt(0)}`}
                                            className="text-xs text-aciu-abriba flex items-center"
                                        >
                                            <Dot size={10} color="#737373"/> {item}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }

                        return (
                            <p key={index} className="text-xs text-aciu-abriba leading-6.5">
                                {content}
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}