import type { NavProps } from "@/utils/types"
import { SearchNormal } from "iconsax-react"
import solar from '@solar-icons/react'
import DummyProfile from "/images/avatar.png"
import { Avatar } from "@mui/material"
import AciuLogo from "/images/mobile-aciu-logo.png"


export const MobileNav = ({ handleOpen }: NavProps) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <img
                    src={AciuLogo} 
                    alt="Official Abriba Communal Improvement Union Logo" 
                    width={80} 
                    height={30}
                    loading="eager"
                />
                <div className="flex items-center gap-4">
                    <button
                        className="border border-aciu-white-normal rounded-[3.125rem] 
                            w-[2.5rem] h-[2.5rem] 
                            flex items-center justify-center"
                        >
                        <SearchNormal
                            fontVariant="linear"
                            color="#7A7A7A"
                            size={24}
                        />
                        </button>
                    <button
                        className="border border-aciu-white-normal rounded-[3.125rem] 
                            w-[2.5rem] h-[2.5rem] 
                            flex items-center justify-center"
                        >
                        <solar.Notifications.BellBing
                            fontVariant="linear"
                            color="#7A7A7A"
                            height={24}
                            width={24}
                        />
                        </button>

                    <button onClick={handleOpen}>
                        <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                    </button>
                </div>
            </div> 
        </div>
    )
}