import FormikField from "@/components/FormikField";

export default function BasicDetailsForm() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                Basic Details
            </p>

            <FormikField
                name="eventTitle"
                label="Event Title"
                placeholder="Input the title of the event"
                fullWidth
            />
            <FormikField
                name="eventDescription"
                label="Event Description"
                placeholder="Describe the event"
                rows={5}
                textarea
                fullWidth
            />
            <FormikField
                name="eventCategory"
                label="Event Category"
                placeholder="Select the category of the event"
                options={[
                    { label: "Branch Events", value: "branch-events" },
                    { label: "National Meetings", value: "national-meetings" }
                ]}
                select
                fullWidth
            />
            <FormikField
                name="eventType"
                label="Event Type"
                placeholder="Select the event type"
                options={[
                    { label: "Physical Events", value: "physical-events" },
                    { label: "Online Event", value: "online-event" }
                ]}
                select
                fullWidth
            />
            <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
                <FormikField
                    label="Guest Expectation"
                    name="guestExpectation"
                    placeholder="Input the guest number in this format: '200 members'"
                    fullWidth
                />
                <FormikField
                    label="Dress Code"
                    name="dressCode"
                    placeholder="Input the event dress code"
                    fullWidth
                />
            </div>
            <FormikField
                label="Entry Fee"
                name="entryFee"
                placeholder="Type the amount or Free if its a free event"
                fullWidth
            />
        </div>
    )
}