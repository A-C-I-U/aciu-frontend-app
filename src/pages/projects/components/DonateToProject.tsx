import FormikField from "@/components/FormikField"
import { donationSchema } from "@/utils/schemas"
import { Button, CircularProgress, Dialog, FormControlLabel, Switch } from "@mui/material"
import { Form, Formik } from "formik"
import { X } from "lucide-react"
import { useState } from "react"
import ThankYouPrompt from "./ThankYouPrompt"
import type { DialogFuncProps } from "@/utils/types"

const initialValues = {
    email: "",
    name: "",
    amount: "",
    remarks: "",
    anonymous: false
}

export default function DonateToProject({
    open,
    onClose
}: DialogFuncProps) {
    const [step, setStep] = useState(1);

    const handleSubmit = async (_values: any, _actions: any) => {
        // TODO: Remove underscores once API integration is added
        setStep(2);
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            onTransitionExited={() => setStep(1)} 
            disableScrollLock
            sx={{
                "& .MuiDialog-paper": {
                    overflow: "hidden",
                    width: {
                        xs: "92%",
                        md: "38.25rem",
                    },
                    margin: "0 auto",
                },
            }}
        >
            {step === 2 ?
                <ThankYouPrompt 
                    title="Thank you!"
                    description="Your donation has been made. 
                        You’ll be contacted if more details are needed."
                    onClose={() => onClose()} 
                />
            :
            <div 
                className="no-scrollbar flex flex-col gap-8 w-full overflow-y-scroll relative mx-auto py-4 md:py-10 px-4 md:px-20"
            >
                <button
                    aria-label="Close donation modal"
                    onClick={onClose}
                    className="absolute right-10 top-6 lg:right-20 lg:top-10 cursor-pointer"
                >
                    <X width={24} height={24} />
                </button>

                <div className="flex flex-col gap-8 w-full">
                    <p className="text-2xl font-coolvetica text-aciu-dark font-bold leading-[125%]">
                        Make a Donation
                    </p>

                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={donationSchema}
                        validateOnMount
                    >
                        {({ values, setFieldValue, isValid, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="flex flex-col gap-8">
                                        <FormikField
                                            label="Email Address"
                                            name="email"
                                            placeholder="princeugbuta@gmail.com"
                                            fullWidth
                                        />

                                        <FormikField
                                            label="Full Name"
                                            name="name"
                                            placeholder="Obinna Chijioke"
                                            fullWidth
                                        />

                                        <div className="flex flex-col gap-1">
                                            <FormikField
                                                label="Amount (USD)"
                                                name="amount"
                                                placeholder="10, 000"
                                                fullWidth
                                            />
                                            <FormControlLabel
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
                                                        checked={values.anonymous}
                                                        onChange={(e) => setFieldValue("anonymous", e.target.checked)}
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
                                                label="Share anonymously"
                                            />

                                        </div>

                                        <FormikField
                                            label="Remarks"
                                            name="remarks"
                                            placeholder="What remarks would you like to give?"
                                            fullWidth
                                        />

                                         <Button
                                            sx={{
                                                color: "white",
                                                fontSize: ".75rem",
                                                backgroundColor: !isValid ? "#ccc" : "#00B686",
                                                borderRadius: ".75rem",
                                                padding: "1rem",
                                                boxShadow: "0px 1px 2px 0px #0D0D120A",
                                                textTransform: "none",
                                                "&.Mui-disabled": {
                                                    backgroundColor: "#e0e0e0",
                                                    color: "#9e9e9e",
                                                    opacity: 0.6,
                                                },
                                            }}
                                            className="flex gap-2 items-center"
                                            disabled={isSubmitting || !isValid}
                                            type="submit"
                                        >
                                            <span className="font-coolvetica text-base">
                                                Donate Now
                                            </span>
    
                                            {isSubmitting && (
                                                <span className="mt-1.5">
                                                    <CircularProgress sx={{ color: "white" }} size={12} />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>

            </div>
        }

        </Dialog>
    )
}