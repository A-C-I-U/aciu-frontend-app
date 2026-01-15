export default function TableSkeleton() {
    return (
        <table className="border-collapse px-3 py-6 table-skeleton">
            <thead>
                <tr className="">
                    <th className="table-skeleton-cell">
                        <span className="h-2 bg-gray-200 rounded mb-2">{""}</span>
                    </th>
                    <th>
                        <span className="h-2 bg-gray-200 rounded mb-2">{""}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <tr key={item}>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="table-skeleton-cell">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}