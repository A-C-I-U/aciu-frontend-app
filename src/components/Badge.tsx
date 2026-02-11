import React from "react";

interface BadgeProps {
    label: string;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, className = "" }) => {
    return (
        <span className={`px-2.5 py-0.5 rounded-[1rem] bg-[#EEEEEE] text-[#737373] text-[0.75rem] font-medium font-montserrat whitespace-nowrap ${className}`}>
            {label}
        </span>
    );
};
