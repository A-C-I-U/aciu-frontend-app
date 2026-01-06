import { array, boolean, date, mixed, number, object, string } from "yup"

export const initialValues = {
    eventTitle: "",
    eventDescription: "",
    eventCategory: "BRANCH_EVENT",
    eventType: "VIRTUAL",
    guestExpectation: "",
    dressCode: "SMART_CASUAL",
    eventDate: "",
    startTime: "",
    endTime: "",
    eventLocation: "",
    eventHighlights: [] as string[],
    entryFee: "",
    image: null as string | File | null,
    enableRsvp: false,
    enableDonations: false,
    enableCountdown: false
}

export const stepSchemas = [
    object({
        eventTitle: string().required("Event title is required"),
        eventDescription: string().required("Event description is required"),
        eventType: string().required("Event type is required"),
        guestExpectation: number().typeError("Guest expectation must be a number").required("Guest expectation is required"),
        dressCode: string().required("Dress code is required"),
        entryFee: number().typeError("Entry Fee must be a number").required("Entry fee is required")
    }),
    object({
        eventDate: date().optional(),
        startTime: string().required("Start Time is required"),
        endTime: string()
            .required("End Time is required")
            .test( "is-greater", "End time must be after start time", 
                function (value) { 
                    const { startTime } = this.parent; 
                    return startTime && value && value > startTime; 
                }),
        eventLocation: string().required("Event Location is required"),
        eventHighlights: array().of(string().required("Add an event highlight")).min(1, "At least one event highlight must be added")
    }),
    object({
        image: mixed()
            .required("An image is required")
            .test("fileType", "Unsupported file format", (value: any) => {
                if (!value) return false;
                if (typeof value === "string") return true;
                return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
            })
            .test("fileSize", "File too large", (value: any) => {
                if (!value) return false;
                if (typeof value === "string") return true;
                return value.size <= 10 * 1024 * 1024;
            }),
        enableRsvp: boolean().required("This permission must be selected"),
        enableDonations: boolean().required("This permission must be selected"),
        enableCountdown: boolean().required("This permission must be selected"),
    })
]

export const steps = [
    { id: "1", label: "Basic Details" },
    { id: "2", label: "Schedule & Location" },
    { id: "3", label: " Registration & Media" }
]