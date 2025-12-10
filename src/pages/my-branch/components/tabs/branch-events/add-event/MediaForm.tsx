import CustomSwitch from "@/components/CustomSwitch";
import { UploadFileImage, UploadImageShortMobile } from "@/components/Icons";
import { FilePreviewCard } from "@/pages/resources/components/FilePreviewCard";
import { useFormikContext } from "formik";
import { useRef } from "react"

export default function MediaForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { values, setFieldValue } = useFormikContext<any>();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                    Upload Cover Image
                </p>

                <div 
                    className="cursor-pointer"
                    onClick={() => inputRef.current?.click()}>
                    {!values.image ?
                        <div className="gap-2 flex flex-col">
                            <div className="md:block hidden">
                                <UploadFileImage width="100%" className="h-auto" />
                            </div>

                            <div className="md:hidden block">
                                <UploadImageShortMobile width="100%" className="h-auto" />
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="font-montserrat text-grayscale-100 text-xs md:text-sm">
                                    Supported formats: pdf,docx,xml
                                </p>
                                <p className="font-montserrat text-grayscale-100 text-xs md:text-sm">
                                    Max: 10mb
                                </p>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col gap-2.5 items-center">
                            <FilePreviewCard 
                                file={values.image} 
                                width="w-65" 
                                height="h-full" 
                                className="!mt-0"
                            />
                            <div className="w-full self-end">
                                <p className="text-aciu-green-normal font-coolvetica text-sm">
                                    Edit file
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    hidden
                    onChange={(e) => setFieldValue("image", e.target.files?.[0] || null)}
                />
            </div>

            <div className="flex flex-col gap-6">
                <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                    Registration & Donation Settings
                </p>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-sm">
                                Enable RSVP?
                            </p>
                            <p className="text-xs leading-5 text-aciu-abriba">
                                Members can register to attend to event.
                            </p>
                        </div>
                        <CustomSwitch
                            checked={values.enableRsvp}
                            onChange={setFieldValue}
                            fieldName="enableRsvp"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-sm">
                                Enable Donations?
                            </p>
                            <p className="text-xs leading-5 text-aciu-abriba">
                                Allows members to support event with money
                            </p>
                        </div>
                        <CustomSwitch
                            checked={values.enableDonations}
                            onChange={setFieldValue}
                            fieldName="enableDonations"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-sm">
                                Enable Countdown?
                            </p>
                            <p className="text-xs leading-5 text-aciu-abriba">
                                Show a countdown to the day of the event
                            </p>
                        </div>
                        <CustomSwitch
                            checked={values.enableCountdown}
                            onChange={setFieldValue}
                            fieldName="enableCountdown"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}