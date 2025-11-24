import { NavLink } from "react-router-dom";
import { CustomCountdown } from "./MonthlyCountdown";
import type { PaymentReminderCardProps } from "@/utils/types";

export default function PaymentReminderCard({
    label = "Your Next Monthly Dues:",
    amount,
    targetDate,
    paymentRoute = "/my-payments",
    buttonText = "Pay now",
    className = "",
    countdownVariant = "inline",
    timeUntilDue 
}: PaymentReminderCardProps) {

    const getTargetDateFromTimeUntilDue = (): Date => {
        if (!timeUntilDue) return targetDate;
        
        const now = new Date();
        const target = new Date(now);
        
        target.setDate(now.getDate() + parseInt(timeUntilDue.days));
        target.setHours(now.getHours() + parseInt(timeUntilDue.hours));
        target.setMinutes(now.getMinutes() + parseInt(timeUntilDue.minutes));
        target.setSeconds(now.getSeconds() + parseInt(timeUntilDue.seconds));
        
        return target;
    };

    return (
        <div className={`flex flex-col gap-6 lg:flex-row items-center lg:justify-between bg-white rounded-md px-2.5 py-4.5 lg:px-6 lg:py-12.5 w-full ${className}`}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-montserrat text-aciu-abriba">
                    {label}
                    <span className="px-2 font-semibold text-lg text-aciu-border-grey">
                        N{(+amount).toLocaleString()}
                    </span>
                </p>
                <div className="bg-aciu-light-red">
                    <CustomCountdown 
                        targetDate={getTargetDateFromTimeUntilDue()} 
                        variant={countdownVariant} 
                    />
                </div>
            </div>
            <NavLink
                to={paymentRoute}
                className="bg-aciu-red p-4 rounded-xl min-w-36 text-center"
            >
                <span className="font-coolvetica text-white">
                    {buttonText}
                </span>
            </NavLink>
        </div>
    );
}