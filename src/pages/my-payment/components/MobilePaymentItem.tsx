import { getPaymentStatusConfig } from "@/utils/helpers";
import { formatDate } from "@/utils/helpers";
import { StatusBadge } from "@/components/StatusBadge";
import { Divider } from "@mui/material";
import type { Payment } from "@/services/types/mypayments";

interface MobilePaymentItemProps {
    payment: Payment;
    paymentType: 'DUE' | 'DONATION';
}

export default function MobilePaymentItem({ 
    payment,
    paymentType
}: MobilePaymentItemProps) {
     const { 
        date,
        amountPaid,
        status
    } = payment;

    const { 
        label, 
        labelColor, 
        dotColor, 
        bgColor 
    } = getPaymentStatusConfig(status); 

    const getCategoryText = () => {
        if (paymentType === 'DUE') {
            return payment.dueType || 'Due Payment';
        } else {
            return payment.targetType || 'Donation';
        }
    };

    const getDescriptionText = () => {
        if (paymentType === 'DUE') {
            return payment.period || 'Payment';
        } else {
            return payment.description || 'No description';
        }
    };

    return (
        <div className="w-full py-4.5 flex flex-col gap-4 items-center rounded-[.625rem] border border-grayscale-200">
            <div className="flex justify-between items-center w-full px-3">
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-xs text-aciu-abriba font-medium">
                        Amount Paid
                    </p>
                        <p className="text-sm text-aciu-border-grey overflow-hidden ellipsis">
                        {`N${Number(amountPaid ?? 0).toLocaleString()}`}
                    </p>
                </div>
                <StatusBadge
                    label={label}
                    labelColor={labelColor}
                    bgColor={bgColor}
                    dotColor={dotColor}
                />
            </div>

            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>

            <div className="flex justify-between w-full items-center px-3">
                <p className="text-xs font-medium text-aciu-abriba">
                    {paymentType === 'DUE' ? 'Due Type' : 'Target Type'}
                </p>
                <p className="text-sm text-aciu-border-grey">
                    {getCategoryText()}
                </p>
            </div>

            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>

            <div className="flex justify-between w-full items-center px-3">
                <p className="text-xs font-medium text-aciu-abriba">
                    Date
                </p>
                <p className="text-sm text-aciu-border-grey">
                    {formatDate(date)}
                </p>
            </div>

            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>

            <div className="flex justify-between w-full items-center px-3">
                <p className="text-xs font-medium text-aciu-abriba">
                    {paymentType === 'DUE' ? 'Period' : 'Description'}
                </p>
                <p className="text-sm text-aciu-border-grey truncate">
                    {getDescriptionText()}
                </p>
            </div>
            
            <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey"/>
            
            <button
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px] pointer-events-none
                border border-aciu-green-normal w-11/12 mx-auto 
                text-center whitespace-nowrap">
                Download Receipt
            </button>
        </div>
    );
}