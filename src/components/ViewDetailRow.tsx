
export const ViewDetailRow = ({ label, content }: { label: string, content: React.ReactNode }) => {
    return (
        <tr>
            <td className="payment-table-column title whitespace-nowrap align-text-top">{label}</td>
            <td className="payment-table-column desc capitalize align-text-top max-w-92 break-words">{content}</td>
        </tr>
    )
}