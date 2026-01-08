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
                    { label: "Branch Event", value: "BRANCH_EVENT" },
                    { label: "National Meeting", value: "NATIONAL_EVENT" },
                ]}
                select
                fullWidth
            />
            <FormikField
                name="eventType"
                label="Event Type"
                placeholder="Select the event type"
                options={[
                    { label: "Physical Event", value: "PHYSICAL" },
                    { label: "Online Event", value: "VIRTUAL" },
                    { label: "Hybrid Event", value: "HYBRID" }
                ]}
                select
                fullWidth
            />
            <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
                <FormikField
                    label="Guest Expectation"
                    name="guestExpectation"
                    placeholder="Input the number of guests"
                    fullWidth
                />
                <FormikField
                    name="dressCode"
                    label="Dress Code"
                    placeholder="Select the event dress code"
                    options={[
                        { label: "Traditional Wear", value: "TRADITIONAL_WEAR" },
                        { label: "Smart Casual", value: "SMART_CASUAL" },
                        { label: "Formal Wear", value: "FORMAL_WEAR" },
                        { label: "Casual Wear", value: "CASUAL_WEAR" }
                    ]}
                    select
                    fullWidth
                />
            </div>
            <FormikField
                label="Entry Fee"
                name="entryFee"
                placeholder="Type the amount or 0 if it's a free event"
                fullWidth
            />
        </div>
    )
}