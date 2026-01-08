import FormikField from "@/components/FormikField";
import { FieldArray, useFormikContext } from "formik";

export default function DateTimeForm() {
    const { values } = useFormikContext<any>();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                    Date & Time
                </p>

                <div className="flex flex-col gap-4 lg:gap-2 justify-between items-start w-full">
                    <FormikField
                        name="eventDate"
                        label="Event Date"
                        placeholder="Select the date of the event"
                        disabled
                        fullWidth
                    />
                    <FormikField
                        name="eventTime"
                        label="Event Time"
                        placeholder="Select the time of the event"
                        options={[
                            { label: "08:00am - 10:00am", value: "08:00-10:00" },
                            { label: "10:30am - 12:00pm", value: "10:30-12:00" },
                            { label: "12:30pm - 02:00pm", value: "12:30-14:00" },
                            { label: "02:30pm - 05:00pm", value: "14:30-17:00" },
                            { label: "05:30pm - 07:00pm", value: "17:30-19:00" },
                        ]}
                        select
                        fullWidth
                    />

                </div>

                <FormikField
                    name="eventLocation"
                    label="Event Location/link"
                    placeholder="Add the event address/link to the location"
                    fullWidth
                />

            </div>
            <div className="flex flex-col gap-6">
                <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                    Event Highlights
                </p>
                <FieldArray name="eventHighlights">
                    {({ push, remove }) => (
                        <>
                            {values.eventHighlights.map((_: any, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <FormikField
                                        name={`eventHighlights[${index}]`}
                                        label={`Event Highlight ${index + 1}`}
                                        placeholder="Add an event highlight"
                                        fullWidth
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 text-xs"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => push("")}
                                className="text-aciu-green-normal font-coolvetica text-left"
                            >
                                + Add more
                            </button>
                        </>
                    )}
                    </FieldArray>
            
            </div>
        </div>
    )
}