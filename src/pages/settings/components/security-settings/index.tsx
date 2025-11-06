import { Divider } from "@mui/material";

export default function SecuritySettings() {
    return (
        <div className="flex flex-col gap-6">
            <div className="lg:px-10 flex flex-col gap-2">
                <p className="lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                    Security Settings
                </p>
                <p className="text-sm lg:text-base">
                    Keep your account safe and secure.
                </p>
            </div>
            <Divider orientation="horizontal" flexItem />
            <div className="flex flex-col gap-3 lg:px-10 py-4 lg:py-7">
                <div className="flex justify-between flex-col gap-6 lg:gap-0">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm md:text-[1.125rem] text-aciu-border-grey">
                            Change Password
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                            Set a unique password to protect your account.
                        </p>
                    </div>
                    <button
                        className="rounded-xl p-4 border border-aciu-green-normal text-[#122730]
                        font-clash-display bg-aciu-green-light text-sm font-medium max-w-fit"
                        
                    >
                       Change Password
                    </button>
                </div>

                <div className="flex justify-between py-7">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm md:text-[1.125rem] text-aciu-border-grey">
                            Enable Multi Factor Authentication (MFA)
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                            Add an extra level of security to your account. 
                            An OTP would be sent to your email every time you want to access your account.
                        </p>
                    </div>
                    {/* <FormControlLabel
                        sx={{
                        "& .MuiFormControlLabel-label": {
                            color: "#737373",
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: ".75rem"
                        },
                        }}
                        control={
                        <Switch
                            checked={}
                            onChange={(e) => onChange(fieldName, e.target.checked)}
                            sx={{
                            height: "2.625rem",
                            width: "3.625rem",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#fff",
                                padding: "10px",
                                transform: "translateX(1rem)",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                                backgroundColor: "#00B686",
                                opacity: 1,
                            }
                            }}
                        />
                        }
                        label=""
                    /> */}
                </div>

                <Divider orientation="horizontal" className="text-[#F4F4F4]" flexItem />
                <div className="flex justify-between flex-col gap-6 lg:flex-row lg:gap-0 py-4 lg:py-7">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm md:text-[1.125rem] text-aciu-border-grey">
                            Deactivate account
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                           All operations on this account will be discontinued.
                        </p>
                    </div>
                    <button
                        className="rounded-xl p-4 border border-red-50 max-w-fit
                        font-clash-display text-red-100 font-medium text-sm"
                        
                    >
                       Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    )
}