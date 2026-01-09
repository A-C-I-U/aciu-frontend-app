
export const ViewDetailRow = ({ label, content }: { label: string, content: React.ReactNode }) => {
    return (
        <tr>
            <td className="payment-table-column title whitespace-nowrap">{label}</td>
            <td className="payment-table-column desc capitalize whitespace-nowrap max-w-92 truncate">{content}</td>
        </tr>
    )
}