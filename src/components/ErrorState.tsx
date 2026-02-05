import { Warning2 } from "iconsax-react";

export default function ErrorState({
    label
}: { label: string}) {
    return (
         <div className="flex flex-col gap-2 h-full min-h-80 w-full items-center justify-center">
                    <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                        <Warning2 size={32} color="#fb2c36" variant="Linear"/>
                    </div>
                    <p className="text-sm md:text-base font-semibold text-red-500">
                        Error
                    </p>
                    <p className="text-xs md:text-sm text-red-500  max-w-70 text-center">
                        Failed to load {label}. Please try again.
                    </p>
                </div>
    )
}