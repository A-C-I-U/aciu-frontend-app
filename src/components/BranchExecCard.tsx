import type { BranchExecCardProps } from "@/utils/types"
import DummyProfile from "/images/avatar.png"
import { Avatar, Divider } from "@mui/material"
import { Copy } from "iconsax-react"
import { copyTextToClipboard } from "@/utils/helpers"

export const BranchExecCard = ({
    branchExec
}: { branchExec: BranchExecCardProps }) => {
    const {
        name,
        position,
        occupation,
        email,
        phoneNumber
    } = branchExec;
    
    return (
       <div
            className="branch-exec-card bg-card-100 py-7 px-2 rounded-[0.625rem] flex flex-col gap-5.5 w-full h-86.5"
        >
            <div className="flex items-center gap-2">
                <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                <div className="flex flex-col gap-2">
                <p className="font-semibold">{name}</p>
                <p>{position}</p>
                </div>
            </div>

            <Divider orientation="horizontal" className="text-aciu-dark-grey" flexItem />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 bg-white px-4 py-2.5 rounded-[0.625rem]">
                    <p className="text-xs text-aciu-abriba">Occupation</p>
                    <p className="text-sm font-medium">{occupation}</p>
                </div>

                <div className="flex justify-between items-center w-full bg-white px-4 py-2.5 rounded-[0.625rem]">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-aciu-abriba">Email Address</p>
                        <p className="text-sm font-medium text-aciu-border-grey">{email}</p>
                    </div>
                    <button 
                        onClick={() => copyTextToClipboard(email)}
                    >
                        <Copy variant="Bulk" size={20} color="#00B686" />
                    </button>
                </div>

                <div className="flex justify-between items-center w-full bg-white px-4 py-2.5 rounded-[0.625rem]">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-aciu-abriba">Phone Number</p>
                        <p className="text-sm font-medium">{phoneNumber}</p>
                    </div>
                    <button 
                        onClick={() => copyTextToClipboard(phoneNumber)}
                    >
                        <Copy variant="Bulk" size={20} color="#00B686" />
                    </button>
                </div>
            </div>
        </div>
    )
}