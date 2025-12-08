import type { DueRulesType } from "@/utils/types"

export default function DueRules({
    dueRules
}: { dueRules: DueRulesType}) {
    const { ageGrades, gender, location, memberRoles, currency, notifications } = dueRules;
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
                    value={ageGrades}
                />
                <DetailRow
                    label="Gender"
                    value={gender}
                />
                <DetailRow
                    label="Location"
                    value={location}
                />
                <DetailRow
                    label="Member Role"
                    value={memberRoles}
                />
                <DetailRow
                    label="Currency"
                    value={currency}
                />
                <DetailRow
                    label="Notifications"
                    value={notifications}
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