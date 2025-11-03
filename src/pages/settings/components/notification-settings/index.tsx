import { Divider } from "@mui/material";

export default function NotificationSettings() {
    return (
         <div className="flex flex-col gap-6">
            <div className="pl-10 flex flex-col gap-2">
                <p className="text-xl font-semibold leading-5 text-aciu-border-grey">
                    Notification Settings
                </p>
                <p className="">
                    Choose how and where you receive updates from ACIU.
                </p>
            </div>
            <Divider orientation="horizontal" flexItem />
            <div className="flex flex-col gap-3 px-10">
                <div className="flex flex-col gap-11">
                    <div className="flex flex-col gap-8">
                        <p className="font-semibold">
                            Email Notifications
                        </p>
                        <p className="text-aciu-abriba">
                            Get emails to find out what’s going on when you are offline. 
                            You can turn them off anytime.
                        </p>
                    </div>
                    <Divider orientation="horizontal" className="text-[#F4F4F4]" />
                    <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Notifications From Us</p>
                            <p className="text-sm leading-5 text-aciu-abriba">
                                Receive the latest updates and news from us.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">News and Updates:</p>
                                    <p className="text-xs leading-5 text-aciu-abriba">
                                        Get the latest news about products and features.
                                    </p>
                                </div>
                                {/* Add Switch Component here */}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">Important Notifications</p>
                                    <p className="text-xs leading-5 text-aciu-abriba">
                                        Receive alerts about critical account activities.
                                    </p>
                                </div>
                                {/* Add Switch Component here */}
                            </div>
                        </div>


                    </div>

                     <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Notifications From Us</p>
                            <p className="text-sm leading-5 text-aciu-abriba">
                                Receive the latest updates and news from us.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">News and Updates:</p>
                                    <p className="text-xs leading-5 text-aciu-abriba">
                                        Get the latest news about products and features.
                                    </p>
                                </div>
                                {/* Add Switch Component here */}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">Important Notifications</p>
                                    <p className="text-xs leading-5 text-aciu-abriba">
                                        Receive alerts about critical account activities.
                                    </p>
                                </div>
                                {/* Add Switch Component here */}
                            </div>
                        </div>


                    </div>

                     <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Notifications From Us</p>
                            <p className="text-sm leading-5 text-aciu-abriba">
                                Receive the latest updates and news from us.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">News and Updates:</p>
                                    <p className="text-xs leading-5 text-aciu-abriba">
                                        Get the latest news about products and features.
                                    </p>
                                </div>
                                {/* Add Switch Component here */}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">Important Notifications</p>
                                    <p className="text-xs leading-5 text-aciu-abriba">
                                        Receive alerts about critical account activities.
                                    </p>
                                </div>
                                {/* Add Switch Component here */}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}