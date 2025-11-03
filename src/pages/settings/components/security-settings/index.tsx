import { Divider } from "@mui/material";

export default function SecuritySettings() {
    return (
        <div className="flex flex-col gap-6">
            <div className="px-10 flex flex-col gap-2">
                <p className="text-xl font-semibold leading-5 text-aciu-border-grey">
                    Security Settings
                </p>
                <p className="">
                    Keep your account safe and secure.
                </p>
            </div>
            <Divider orientation="horizontal" flexItem />
            <div className="flex flex-col gap-3 px-10">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">
                            Change Password
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                            Set a unique password to protect your account.
                        </p>
                    </div>
                    {/* Add Switch Component here */}
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">
                            Enable Multi Factor Authentication (MFA)
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                            Add an extra level of security to your account. 
                            An OTP would be sent to your email every time you want to access your account.
                        </p>
                    </div>
                    {/* Add Switch Component here */}
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">Deactivate account</p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                           All operations on this account will be discontinued.
                        </p>
                    </div>
                    <button
                        className="rounded-xl p-4 border border-red-50
                        font-coolvetica text-red-100"
                        
                    >
                       Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    )
}