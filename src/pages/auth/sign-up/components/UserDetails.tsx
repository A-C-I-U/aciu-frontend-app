import AuthCard from "@/components/AuthCard";
import { ArrowLeft } from "iconsax-react";
import type { SignUpFormValues } from "@/utils/types";

interface UserDetailsProps {
    values: SignUpFormValues | null;
    onBack: () => void;
}

export default function UserDetails({ values, onBack }: UserDetailsProps) {
    const details = [
        { label: "Full Name", value: values?.fullName || "—" },
        { label: "Email Address", value: values?.email || "—" },
        { label: "Phone Number", value: values?.phoneNumber || "—" },
        { label: "Gender", value: values?.gender || "—" },
        { label: "Branch Location", value: values?.location || "—" },
        { label: "Branch", value: values?.branch || "—" },
        { label: "Village", value: values?.village || "—" },
        { label: "Age Grade", value: values?.ageGrade || "—" },
        { label: "Occupation", value: values?.occupation || "—" },
    ];

    return (
        <AuthCard
            optionalHeader={true}
            optionalCardHeader={
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-aciu-card-grey hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={20} color="#3E3E3E" className="md:w-6 md:h-6" />
                    </button>
                    <h1 className="font-coolvetica text-aciu-border-grey font-bold text-xl md:text-2xl">
                        View my Details
                    </h1>
                </div>
            }
        >
            <div className="overflow-hidden border border-aciu-card-grey rounded-2xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#F9FAFB] border-b border-aciu-card-grey">
                            <th className="px-4 py-4 text-left font-montserrat font-bold text-aciu-border-grey text-sm md:text-base border-r border-aciu-card-grey w-[40%]">
                                Title
                            </th>
                            <th className="px-4 py-4 text-left font-montserrat font-bold text-aciu-border-grey text-sm md:text-base">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail) => (
                            <tr
                                key={detail.label}
                                className="border-b border-aciu-card-grey last:border-0"
                            >
                                <td className="bg-[#F9FAFB] px-4 py-4 font-montserrat text-aciu-neutral text-[11px] md:text-sm border-r border-aciu-card-grey font-medium">
                                    {detail.label}
                                </td>
                                <td className="bg-white px-4 py-4 font-montserrat text-aciu-border-grey text-[11px] md:text-sm font-semibold break-words">
                                    {detail.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthCard>
    );
}
