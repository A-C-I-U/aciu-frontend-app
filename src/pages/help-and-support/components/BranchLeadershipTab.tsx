import type { Leadership } from "@/services/types/helpandsupport"
import { BranchExecCard } from "./BranchExecCard"

interface BranchLeadershipTabProps {
  leadership: Leadership[]
}

export const BranchLeadershipTab = ({ leadership }: BranchLeadershipTabProps) => {
  if (!leadership || leadership.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h4 className="font-coolvetica text-xl text-aciu-border-grey line-height-120">
          Branch Executives
        </h4>
        <p className="text-aciu-abriba">No leadership data available for this branch.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-coolvetica text-xl text-aciu-border-grey line-height-120">
        Branch Executives
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4">
        {leadership.map((leader) => (
          <BranchExecCard
            key={leader.id}
            branchExec={{
              id: leader.id, 
              name: leader.fullName,
              position: leader.role,
              occupation: leader.occupation,
              email: leader.email,
              phoneNumber: leader.phone
            }}
          />
        ))}
      </div>
    </div>
  )
}