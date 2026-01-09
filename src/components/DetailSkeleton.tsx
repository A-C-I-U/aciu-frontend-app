export const DetailSkeleton = () => {
    return (
        <table>
            <thead>
                <tr className="payment-table-column title">
                    <th>
                        <span className="h-2 bg-gray-200 rounded mb-2">{""}</span>
                    </th>
                    <th>
                        <span className="h-2 bg-gray-200 rounded mb-2">{""}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <tr key={item}>
                        <td className="payment-table-column title">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="payment-table-column desc capitalize">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}