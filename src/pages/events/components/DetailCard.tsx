import type { DetailCardProps } from "@/utils/types";

export default function DetailCard({ icon, title, content}: DetailCardProps) {
    return (
        <div className="bg-aciu-light-yellow rounded-[1.25rem] h-48 min-w-72 px-6 flex flex-col relative w-full">
            <div className="flex flex-col gap-2.5 lg:gap-3 justify-center h-full">
                {icon}
                <p className="font-coolvetica text-aciu-abriba text-xs lg:text-sm z-20">
                    {title}
                </p>
                <p className="font-medium text-xl lg:text-2xl z-20 capitalize">
                    {content.includes("NGN") ? content : content.toLowerCase()}
                </p>
            </div>
            <picture>
                <source media="(min-width:1024px)" srcSet="/images/ellipse-one.png" />
                <img src="/images/ellipse-one-mobile.png" className="absolute right-0 top-6 lg:top-6 lg:bottom-auto object-cover" alt="" />
            </picture>
            <picture>
                <source media="(min-width:1024px)" srcSet="/images/ellipse-two.png" />
                <img src="/images/ellipse-two-mobile.png" className="object-cover absolute bottom-0 right-0" alt="" />
            </picture>
        </div>
    )
}