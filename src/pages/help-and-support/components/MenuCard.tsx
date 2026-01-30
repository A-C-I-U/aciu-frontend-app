import type { MenuCardProps } from "@/utils/types";
import { Link } from "react-router-dom";

export default function MenuCard({
    icon: Icon,
    title,
    description,
    route,
    onClick
}: MenuCardProps) {

    const content = (
       <div
            className="flex flex-col gap-2 rounded-2xs border border-aciu-light-grey py-3.5 px-2.5 w-full h-full"
        >
            <div
                className="w-fit h-fit px-2 py-2 bg-aciu-green-light rounded-[5.65px] border border-aciu-light-grey"
            >
                <Icon size={20} color="#00B686" />
            </div>

            <p className="font-semibold leading-6">
                {title}
            </p>

            <p className="text-sm leading-6 text-aciu-dark-grey-active">
                {description}
            </p>
        </div>

    )

    if (!onClick) {
        return (
            <Link
                to={route} 
                style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    cursor: "pointer",
                    width: "100%"
                }}
                className="w-full h-full"
            >
                {content}
            </Link>
        )
    }
    return (
       <button
            onClick={() => onClick()}
            className="text-left w-full"
        >
            {content}
        </button>
    )
}