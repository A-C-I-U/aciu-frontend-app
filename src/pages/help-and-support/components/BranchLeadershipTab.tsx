import { branchExecutiveMockData } from "@/utils/data"
import { BranchExecCard } from "./BranchExecCard"

export const BranchLeadershipTab = () => {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-coolvetica text-xl text-aciu-border-grey line-height-120">
                Branch Executives
            </h4>

            <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4"
            >
                {branchExecutiveMockData.map(
                    ({ name, position, occupation, email, phoneNumber }, index) => (
                        <BranchExecCard
                            key={index}
                            name={name}
                            position={position}
                            occupation={occupation}
                            email={email}
                            phoneNumber={phoneNumber}
                        />
                    )
                )}
            </div>
        </div>

    )
}