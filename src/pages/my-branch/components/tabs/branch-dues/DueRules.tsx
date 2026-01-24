import { useDuesRules } from "@/services/hooks/dues";
import { EmptyRecords } from "../../EmptyStates";

export default function DueRules({ id }: { id: string}) {
    const { data: dueRules } = useDuesRules(id);

    if (!dueRules) return <EmptyRecords />;

    return (
        <table>
            <thead>
                <tr className="text-left">
                    <th className="payment-table-column title">Rule Type</th>
                    <th className="payment-table-column desc">Condition Applied</th>
                </tr>
            </thead>
            <tbody>
                <DetailRow
                    label="Age Grades"
                    value={dueRules.rules.ageGrades}
                />
                <DetailRow
                    label="Gender"
                    value={dueRules.rules.gender}
                />
                <DetailRow
                    label="Location"
                    value={dueRules.rules.location}
                />
                <DetailRow
                    label="Member Role"
                    value={dueRules.rules.memberRoles}
                />
                <DetailRow
                    label="Currency"
                    value={dueRules.rules.currency}
                />
                <DetailRow
                    label="Notifications"
                    value={dueRules.notifications}
                />
            </tbody>
        </table>
    )
}


const DetailRow = ({ label, value }: { label: string, value: React.ReactNode}) => {
    if (Array.isArray(value)) {
        value = value.join(", ")
    } else {
        value = value;
    }
    
    return (
        <tr>
            <td className="payment-table-column title">{label}</td>
            <td className="payment-table-column desc">{value}</td>
        </tr>
    )
}