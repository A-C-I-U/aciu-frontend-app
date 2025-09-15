import type { DetailCardProps } from "@/utils/types";

export default function DetailCard({ icon, title, content}: DetailCardProps) {
    return (
        <div className="bg-aciu-light-yellow rounded-[1.25rem] h-[12rem] min-w-[18rem] px-6 flex flex-col relative w-full">
            <div className="flex flex-col gap-[.625rem] lg:gap-3 justify-center h-full">
                {icon}
                <p className="font-coolvetica text-aciu-abriba text-xs lg:text-sm">
                    {title}
                </p>
                <p className="font-medium font-montserrat text-xl lg:text-2xl">
                    {content}
                </p>
            </div>
            <img src="/images/ellipse-one-mobile.png" className="lg:hidden object-cover absolute bottom-0 right-0" />
            <img src="/images/ellipse-two-mobile.png" className="lg:hidden object-cover absolute bottom-0 right-0" />
            <img src="/images/ellipse-one.png" className="hidden lg:block object-cover absolute top-6 right-0" />
            <img src="/images/ellipse-two.png" className="hidden lg:block object-cover absolute bottom-0 right-0" />
        </div>
    )
}