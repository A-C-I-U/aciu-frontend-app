import { BranchInitials } from "@/pages/help-and-support/components/BranchInitials";
import { Edit } from "iconsax-react";

interface BranchInfo {
    createdAt: string,
    meetingLocation: string,
    branchKey: string,
    branchName: string,
    branchChairman: string,
    branchChairmanEmail: string
}

export default function BranchInfoCard({
    branchInfo
}: { branchInfo: BranchInfo }) {
    const {
        createdAt,
        meetingLocation,
        branchKey,
        branchName,
        branchChairman,
        branchChairmanEmail
    } = branchInfo;

    const branchInfoDetails = [
        { title: "Meeting Location", content: meetingLocation },
        { title: "Branch Chairman", content: branchChairman },
        { title: "Branch Chairman Email", content: branchChairmanEmail },
        { title: "Created at", content: createdAt }
    ]

    return (
        <div className="bg-white rounded-[.625rem] py-6 px-5 flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between lg:items-center">
                <div className="flex  items-center gap-4">
                    <BranchInitials branchName={branchKey} />
                    <h5 className="text-xl text-aciu-border-grey">
                        {branchName}
                    </h5>
                </div>
                <button className="text-aciu-abriba border border-aciu-abriba rounded-xl flex items-center gap-2 max-w-fit text-sm p-3 lg:text-base lg:p-4 shadow-[0px_1px_3px_0px_#0D0D120D]">
                    <Edit size={24} color="#3E3E3E" />
                    Edit branch info
                </button>
            </div>

            <div className="hidden lg:grid lg:grid-cols-2 ml:grid-cols-[1fr_.5fr_.5fr_.5fr] items-start gap-4">
                {branchInfoDetails.map(({title, content }, index) => (
                    <div key={index} className="flex flex-col gap-2 max-w-83.25">
                        <p className="text-aciu-abriba">
                            {title}
                        </p>
                        <p className="font-medium text-aciu-border-grey">
                            {content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

