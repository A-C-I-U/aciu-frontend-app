import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { initialValues, steps, stepSchemas } from "./constants";
import { useState } from "react";
import { TickSquare } from "iconsax-react";
import { AnimatePresence, motion } from "motion/react";
import BasicDetailsForm from "./BasicDetailsForm";
import DateTimeForm from "./DateTimeForm";
import MediaForm from "./MediaForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEventDetails } from "@/services/hooks/events";
import type { EventCategory, EventDressCode, EventType } from "@/services/types/events";
import { useSaveEvent } from "@/services/mutations/events";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from '@tanstack/react-query';

// Add Event can be routed to
// We might not need this copy
export default function AddEventPage({
    returnRoute
}: { returnRoute: string }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isAdvancing, setIsAdvancing] = useState(false);
    const { eventId } = useParams<{ eventId?: string }>();
    const { data } = useEventDetails(eventId ?? "");
    const saveEventMutation = useSaveEvent();
    const queryClient = useQueryClient();

    
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (currentStep === 1) {
            navigate(-1);
        } else {
            setCurrentStep((step) => step - 1)
        }
    }

    const handleSubmit = async(values: typeof initialValues, actions: any) => {
        const payload = {
            title: values.eventTitle,
            description: values.eventDescription,
            category: values.eventCategory as EventCategory,
            type: values.eventType as EventType,
            guestExpectation: values.guestExpectation,
            dressCode: values.dressCode as EventDressCode,
            entryFee: values.entryFee,
            eventDate: dayjs(values.eventDate).format("YYYY-MM-DD"),
            startTime: typeof values.startTime === "string" ? values.startTime : dayjs(values.startTime).format('HH:mm'),
            endTime: typeof values.endTime === "string" ? values.endTime : dayjs(values.endTime).format('HH:mm'),
            location: values.eventLocation,
            highlights: values.eventHighlights,
            coverImage: values.image instanceof File ? values.image : null,
            enableCountdown: values.enableCountdown,
            enableRSVP: values.enableRsvp,
            enableDonations: values.enableDonations
        }

        try {
            const result = await saveEventMutation.mutateAsync({ eventId, payload }); 
            if (eventId) {
                queryClient.invalidateQueries({ queryKey: ["event", eventId] });
            }
            enqueueSnackbar(result.message || (eventId ? "Event updated successfully" : "Event created successfully"), 
                { variant: "success" } );
            actions.setSubmitting(false);
            navigate(`/${returnRoute}`, {
                state: { eventTitle: values.eventTitle }
            });
        } catch (error: any) {
            console.error("Event creation error:", error);
            enqueueSnackbar(error, {
                variant: 'error'
            })
        }
    }

    const eventValues = data ? {
        eventTitle: data.event.title,
        eventDescription: data.event.description,
        eventCategory: data.event.category,
        eventType: data.event.type,
        guestExpectation: data.event.guestExpectation.toString(),
        dressCode: data.event.dressCode,
        eventDate: data.event.eventDate,
        startTime: data.event.startTime,
        endTime: data.event.endTime,
        eventLocation: data.event.location,
        eventHighlights: data.event.highlights,
        entryFee: data.event.entryFee,
        image: data.event.coverImage,
        enableRsvp: data.event.enableRSVP,
        enableDonations: data.event.enableDonations,
        enableCountdown: data.event.enableCountdown,
    } : null

    
    return (
        <Formik
            initialValues={(eventId && eventValues) ? eventValues : initialValues}
            validationSchema={stepSchemas[currentStep - 1]}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ isValid, isSubmitting, validateForm }) => {
                return (
                    <Form className="py-4 mx-5 flex flex-col gap-5.5">
                        <div className="flex justify-between items-center">
                            <button 
                                onClick={handleGoBack}
                                type="button" 
                                className="btn bg-aciu-dashboard-background border border-aciu-dark-grey text-aciu-abriba max-w-fit"
                            >
                                <ArrowLeft size={20} color="#737373" />
                                {currentStep === 1 ? "Cancel" : "Back"}
                            </button>
                            <div className="hidden lg:flex items-center gap-3.5">
                                {steps.map((step, index) => (
                                    <Step key={index} currentStep={currentStep} step={step} />
                                ))}
                            </div>
                            {!isAdvancing && (currentStep !== stepSchemas.length ? (
                                <button
                                    type="button"
                                    className="btn btn-primary max-w-fit"
                                    disabled={!isValid || isSubmitting}
                                    onClick={async () => {
                                        setIsAdvancing(true);
                                        const errors = await validateForm();
                                        if (Object.keys(errors).length === 0) {
                                            setCurrentStep(step => step + 1);
                                        }
                                        setIsAdvancing(false);
                                    }}
                                >
                                    Next
                                    <ArrowRight color="#fff" size={20} />
                                </button>
                                ) : (
                                    <button 
                                        type="submit" 
                                        className="max-w-fit btn btn-primary"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        {eventId ? "Update Event" : "Create Event"}
                                        {saveEventMutation.isPending && <CircularProgress sx={{ color: "white" }} size={12} />}
                                        <ArrowRight color="#fff" size={20} />
                                    </button>
                                ))}
                        </div>


                        <div className="bg-white rounded-2xs py-6 px-5 w-full md:w-148 mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {currentStep === 1 && <BasicDetailsForm />}
                                    {currentStep === 2 && <DateTimeForm />}
                                    {currentStep === 3 && <MediaForm />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                    </Form>
                )
            }}
        
        </Formik>
    )
}

const NumberSquare = ({ value }: {value: string | number}) => {
    return (
        <div className="relative inline-block w-6 h-6 border border-aciu-border-100 rounded-[5px]">
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-aciu-border-200">
                {value}
            </span>
        </div>
    )
}

const Step = ({
    currentStep, step 
}: { currentStep: number, step: { id: string | number, label: string }}) => {

    return (
        <div className="flex gap-2 items-center">
            {currentStep >= +step.id ?
                <TickSquare variant="Bold" color="#393939" size={28} /> :
                <NumberSquare value={step.id} />
            }
            <p className={`text-sm leading-5 font-medium ${currentStep == step.id ? "text-aciu-border-300" : "text-aciu-border-200"}`}>
                {step.label}
            </p>
        </div>
    )
}