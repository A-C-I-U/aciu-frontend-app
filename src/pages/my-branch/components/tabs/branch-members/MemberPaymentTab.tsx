import type { BranchMemberDataType } from "@/utils/types";
import { EmptyPaymentsState } from "../../EmptyStates";
import { useMemberPayments } from "@/services/hooks/branch";
import { Skeleton } from "@mui/material";
import { formatCurrency } from "@/utils/helpers";
import { format } from "date-fns";
import { StatusBadge } from "@/components/StatusBadge";

// Status color mapping for payment statuses
const paymentStatusMap: Record<string, { label: string; bgColor: string; dotColor: string; labelColor: string }> = {
    overdue: {
        label: "Overdue",
        bgColor: "#FFE5E5",
        dotColor: "#FF0000",
        labelColor: "#D32F2F"
    },
    paid: {
        label: "Paid",
        bgColor: "#E8F5E9",
        dotColor: "#4CAF50",
        labelColor: "#2E7D32"
    },
    pending: {
        label: "Pending",
        bgColor: "#FFF3E0",
        dotColor: "#FF9800",
        labelColor: "#E65100"
    }
};

export default function MemberPaymentTab({ branchMember }: { branchMember: BranchMemberDataType }) {
    const { data: payments, isLoading } = useMemberPayments(branchMember.id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={80} className="rounded-lg" />
                ))}
            </div>
        );
    }

    if (!payments || payments.length === 0) {
        return <EmptyPaymentsState />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interval</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment, index) => {
                            const statusConfig = paymentStatusMap[payment.status] || paymentStatusMap.pending;
                            const formattedDate = format(new Date(payment.date), "dd MMM yyyy");

                            return (
                                <tr key={index}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formattedDate}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {payment.title}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {payment.interval}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(payment.amountPaid)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <StatusBadge
                                            label={statusConfig.label}
                                            labelColor={statusConfig.labelColor}
                                            bgColor={statusConfig.bgColor}
                                            dotColor={statusConfig.dotColor}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
