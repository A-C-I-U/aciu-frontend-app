import type { BranchExecCardProps } from "@/utils/types"
import DummyProfile from "/images/avatar.png"
import { Avatar, Box } from "@mui/material"
import { Copy } from "iconsax-react"

export const BranchExecCard = ({
    name,
    position,
    occupation,
    email,
    phoneNumber
}: BranchExecCardProps) => {
    return (
        <Box
            bgcolor="#F9FAFC"
            padding="1.75rem .5rem"
            borderRadius=".625rem"
            display="flex"
            flexDirection="column"
            gap="1.313rem"
            minWidth={{
                xs: "100%",
                md: "22.688rem"
            }}
            height={{
                xs: "21.625rem"
            }}
        >
            <Box
                display="flex"
                gap=".5rem"
                alignItems="center"
            >
                <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                <Box
                    display="flex"
                    flexDirection="column"
                    gap=".5rem"
                >
                    <p className="font-montserrat font-semibold leading-[120%] text-aciu-border-grey">
                        {name}
                    </p>
                    <p className="font-montserrat leading-[120%] text-aciu-border-grey">
                        {position}
                    </p>
                </Box>
            </Box>
            <div className="w-full">
                <hr className="w-full border-t-[.5px] text-aciu-dark-grey" color="#C9C9C9"/>
            </div>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap=".25rem"
                    bgcolor="white"
                    padding=".625rem 1rem"
                    borderRadius=".625rem"
                >
                    <p className="text-xs font-montserrat text-aciu-abriba leading-[120%]">
                        Occupation
                    </p>
                    <p className="text-sm font-medium font-montserrat text-aciu-border-grey leading-[120%]">
                        {occupation}
                    </p>
                </Box>
                <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    
                    bgcolor="white"
                    padding=".625rem 1rem"
                    borderRadius=".625rem"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap=".25rem"
                    >
                        <p className="text-xs font-montserrat text-aciu-abriba leading-[120%]">
                            Email Address
                        </p>
                        <p className="text-sm font-medium font-montserrat text-aciu-border-grey leading-[120%]">
                            {email}
                        </p>
                    </Box>
                    <Copy variant="Bulk" size={20} color="#00B686" />
                </Box>

                <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    
                    bgcolor="white"
                    padding=".625rem 1rem"
                    borderRadius=".625rem"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap=".25rem"
                    >
                        <p className="text-xs font-montserrat text-aciu-abriba leading-[120%]">
                            Phone Number
                        </p>
                        <p className="text-sm font-medium font-montserrat text-aciu-border-grey leading-[120%]">
                            {phoneNumber}
                        </p>
                    </Box>
                    <Copy variant="Bulk" size={20} color="#00B686" />
                </Box>
            </Box>

        </Box>
    )
}