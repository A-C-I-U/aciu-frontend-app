import type { BranchExecCardProps } from "@/utils/types"
import DummyProfile from "/images/avatar.png"
import { Avatar } from "@mui/material"
import { Copy } from "iconsax-react"

export const BranchExecCard = ({
    name,
    position,
    occupation,
    email,
    phoneNumber
}: BranchExecCardProps) => {
    return (
       <div
            className="branch-exec-card bg-card-100 py-7 px-2 rounded-[0.625rem] flex flex-col gap-5.5 min-w-full md:min-w-90.5 h-86.5"
        >
            {/* Header Section */}
            <div className="flex items-center gap-2">
                <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                <div className="flex flex-col gap-2">
                <p className="font-semibold">{name}</p>
                <p>{position}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full">
                <hr className="w-full border-t-[0.5px] border-aciu-dark-grey" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-2">
                {/* Occupation */}
                <div className="flex flex-col gap-1 bg-white px-4 py-2.5 rounded-[0.625rem]">
                    <p className="text-xs text-aciu-abriba">Occupation</p>
                    <p className="text-sm font-medium">{occupation}</p>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center w-full bg-white px-4 py-2.5 rounded-[0.625rem]">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-aciu-abriba">Email Address</p>
                        <p className="text-sm font-medium text-aciu-border-grey">{email}</p>
                    </div>
                    <Copy variant="Bulk" size={20} color="#00B686" />
                </div>

                {/* Phone */}
                <div className="flex justify-between items-center w-full bg-white px-4 py-2.5 rounded-[0.625rem]">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-aciu-abriba">Phone Number</p>
                        <p className="text-sm font-medium">{phoneNumber}</p>
                    </div>
                    <Copy variant="Bulk" size={20} color="#00B686" />
                </div>
            </div>
        </div>
    )
}