import { branchExecutiveMockData } from "@/utils/data"
import { Box } from "@mui/material"
import { BranchExecCard } from "./BranchExecCard"

export const BranchLeadershipTab = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={4}
        >
            <h4 className="font-coolvetica text-xl text-aciu-border-grey leading-[120%]">
                Branch Executives
            </h4>

            <Box
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                columnGap="1rem"
                rowGap="1rem"
            >
                {branchExecutiveMockData.map(({ name, position, occupation, email, phoneNumber }) => (
                    <BranchExecCard
                        name={name}
                        position={position}
                        occupation={occupation}
                        email={email}
                        phoneNumber={phoneNumber}
                    />
                ))}
            </Box>
        </Box>
    )
}