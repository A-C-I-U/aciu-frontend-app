import AuthCard from "@/components/AuthCard";
import { useMemo, useEffect } from "react";
import { ArrowLeft, Copy } from "iconsax-react";
import { enqueueSnackbar } from "notistack";
import { useUserProfile } from "@/services/hooks/auth";
import { Skeleton } from "@mui/material";
import type { Admin } from "@/services/types/auth";


interface AdminListProps {
    onBack: () => void;
    userEmail?: string;
}

export default function AdminList({ onBack, userEmail }: AdminListProps) {
    const { mutate: getProfile, data: profile, isPending: isLoading, isError } = useUserProfile();

    useEffect(() => {
        if (userEmail) {
            getProfile({ email: userEmail });
        }
    }, [userEmail, getProfile]);

    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const handleCopy = async (text: string, label: string) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            enqueueSnackbar(`${label} copied to clipboard!`, {
                variant: "success",
                autoHideDuration: 2000,
            });
        } catch (err) {
            enqueueSnackbar("Failed to copy", { variant: "error" });
        }
    };

    const admins = useMemo(() => {
        if (!profile?.user) return [];

        const { branchAdmin, president, branchExecutive } = profile.user;

        return [
            branchAdmin && {
                id: branchAdmin.id,
                name: branchAdmin.fullName,
                role: "Branch Admin",
                email: branchAdmin.email,
                phone: branchAdmin.phone
            },
            president && {
                id: president.id,
                name: president.fullName,
                role: president.position || "President",
                email: president.email,
                phone: president.phone
            },
            branchExecutive && {
                id: branchExecutive.id,
                name: branchExecutive.fullName,
                role: branchExecutive.position,
                email: branchExecutive.email,
                phone: branchExecutive.phone
            }
        ].filter((admin): admin is Admin => !!admin);
    }, [profile]);

    if (isLoading) {
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
                            ACIU Admins
                        </h1>
                    </div>
                }
            >
                <div className="flex flex-col gap-4 md:gap-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-[#F9FAFB] rounded-[1.25rem] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <Skeleton variant="circular" width={48} height={48} className="md:w-14 md:h-14" />
                                <div className="flex flex-col gap-1 w-full max-w-[150px]">
                                    <Skeleton variant="text" width="100%" height={24} />
                                    <Skeleton variant="text" width="60%" height={20} />
                                </div>
                            </div>
                            <Skeleton variant="rectangular" width="100%" height={1} className="opacity-40" />
                            <div className="flex flex-col gap-3 md:gap-4">
                                <Skeleton variant="rectangular" width="100%" height={70} className="rounded-2xl" />
                                <Skeleton variant="rectangular" width="100%" height={70} className="rounded-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </AuthCard>
        );
    }

    if (isError) {
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
                            ACIU Admins
                        </h1>
                    </div>
                }
            >
                <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
                    <p className="font-montserrat text-red-500 font-bold">Error loading admins</p>
                    <p className="font-montserrat text-aciu-neutral text-xs">Please try again later or contact support.</p>
                </div>
            </AuthCard>
        );
    }

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
                        ACIU Admins
                    </h1>
                </div>
            }
        >
            <div className="flex flex-col gap-4 md:gap-6">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <div key={admin.id} className="bg-[#F9FAFB] rounded-[1.25rem] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                            {/* Admin Info */}
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-aciu-green-light flex items-center justify-center text-aciu-green-normal font-bold text-lg md:text-xl font-coolvetica">
                                    {getInitials(admin.name)}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="font-montserrat font-bold text-aciu-border-grey text-base md:text-lg leading-tight">
                                        {admin.name}
                                    </h3>
                                    <p className="font-montserrat text-aciu-neutral text-xs md:text-sm">
                                        {admin.role}
                                    </p>
                                </div>
                            </div>

                            <hr className="border-aciu-card-grey border-t w-full opacity-40" />

                            {/* Contact Details */}
                            <div className="flex flex-col gap-3 md:gap-4">
                                {/* Email */}
                                <div className="bg-white rounded-2xl p-3 md:p-4 flex flex-col gap-1 relative border border-gray-50">
                                    <span className="text-aciu-neutral text-[9px] md:text-[10px] font-medium font-montserrat tracking-tight uppercase">
                                        Email Address
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-aciu-border-grey font-semibold text-xs md:text-sm font-montserrat truncate pr-2">
                                            {admin.email}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(admin.email, "Email")}
                                            className="text-aciu-green-normal hover:scale-110 transition-transform flex-shrink-0"
                                        >
                                            <Copy variant="Bulk" size={20} color="#00B686" className="md:w-6 md:h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="bg-white rounded-2xl p-3 md:p-4 flex flex-col gap-1 relative border border-gray-50">
                                    <span className="text-aciu-neutral text-[9px] md:text-[10px] font-medium font-montserrat tracking-tight uppercase">
                                        Phone Number
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-aciu-border-grey font-semibold text-xs md:text-sm font-montserrat">
                                            {admin.phone}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(admin.phone, "Phone number")}
                                            className="text-aciu-green-normal hover:scale-110 transition-transform flex-shrink-0"
                                        >
                                            <Copy variant="Bulk" size={20} color="#00B686" className="md:w-6 md:h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <p className="font-montserrat text-aciu-neutral text-sm italic">No administrators found for your branch.</p>
                    </div>
                )}
            </div>
        </AuthCard>
    );
}
