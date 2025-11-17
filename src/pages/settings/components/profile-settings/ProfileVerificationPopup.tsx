import { ProfileVerificationIcon } from "@/components/Icons";

export default function ProfileVerificationPopup() {
    return (
        <div className="rounded-lg py-6 px-4 min-h-55 bg-aciu-orange-100 flex flex-col gap-8 w-full lg:max-w-91.5">
            <div className="flex gap-4 items-start">
                <ProfileVerificationIcon width={64} height={64} className="shrink-0"/>
                <div className="flex flex-col gap-2 items-start">
                    <p className="text-white font-semibold">
                        Your Profile Is Awaiting Verification
                    </p>
                    <p className="text-xs text-aciu-green-light-hover">
                        Your account needs to be verified by your branch and 
                        age grade to unlock full access to the platform.
                    </p>
                </div>
            </div>
            <button className="rounded-[.625rem] bg-white p-4 font-coolvetica text-aciu-green-normal">
                Resend Verification Reminder
            </button>
        </div>
    )
}