import { useDuesRules } from "@/services/hooks/dues";
import { EmptyRecords } from "../../EmptyStates";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { Information } from "iconsax-react";
import { DetailSkeleton } from "@/components/DetailSkeleton";

export default function DueRules({ id }: { id: string}) {
    const { data: dueRules, isLoading } = useDuesRules(id);

    if (isLoading && !dueRules) return <div className="w-full"><DetailSkeleton /></div>;

    if (!dueRules && !isLoading) return <EmptyRecords />;

    return (
        <>
        {dueRules && !isLoading &&
            <div className="flex flex-col gap-5 h-full w-full">
                <table className="w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="payment-table-column title lg:w-51">Rule Type</th>
                            <th className="payment-table-column desc">Condition Applied</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ViewDetailRow
                            label="Age Grades"
                            content={dueRules.rules.ageGrades.map((grade, index) => <span key={index}>{grade}</span>)}
                        />
                        <ViewDetailRow
                            label="Gender"
                            content={dueRules.rules.gender}
                        />
                        <ViewDetailRow
                            label="Location"
                            content={dueRules.rules.location}
                        />
                        <ViewDetailRow
                            label="Member Roles"
                            content={dueRules.rules.memberRoles.map((role, index) => <span key={index}>{role}</span>)}
                        />
                        <ViewDetailRow
                            label="Currency"
                            content={dueRules.rules.currency}
                        />
                        <ViewDetailRow
                            label="Notifications"
                            content={dueRules.notifications.map((notification, index) => <span key={index}>{notification}</span>)}
                        />
                    </tbody>
                </table>
                <div className="mt-auto py-4 px-2.5 text-sm leading-default rounded-2xs flex gap-1 bg-[#F2FFFD] border border-aciu-green-normal">
                    <Information variant="Bold" size={24} color="#00B686"/>
                    <span>
                        These rules automatically determine visibility and eligibility for payment on each member's dashboard.
                    </span>
                </div>
            </div>}
        </>
    )
}