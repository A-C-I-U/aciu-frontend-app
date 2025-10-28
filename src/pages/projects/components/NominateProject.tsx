import FormikField from "@/components/FormikField"
import { CloudIcon } from "@/components/Icons"
import { projectCategoryOptions } from "@/utils/data"
import { projectSchema } from "@/utils/schemas"
import { Button, CircularProgress, Dialog, FormLabel } from "@mui/material"
import { Form, Formik } from "formik"
import { X } from "lucide-react"
import { useRef, useState } from "react"
import ThankYouPrompt from "./ThankYouPrompt"
import type { DialogFuncProps } from "@/utils/types"


export default function NominateProject({
    open,
    onClose
}: DialogFuncProps) {

    const [step, setStep] = useState(1);

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (values: any, actions: any) => {
        console.log(values, actions); 
        setStep(2);
    }

    const initialValues = {
        title: "",
        category: "",
        location: "",
        description: "",
        impact: "",
        cost: "",
        image: "",
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
                        md: step === 1 ? "38.25rem" : "31.25rem",
                    },
                    margin: "0 auto",
                    borderRadius: "1.25rem"
                },
            }}
        >
            {step === 2 ?
                <ThankYouPrompt 
                    title="Thank you!"
                    description="Your project has been submitted for review. 
                        You’ll be contacted if more details are needed."
                    onClose={() => onClose()} 
                />
            :
            <div
                className="no-scrollbar flex flex-col gap-8 w-full overflow-y-scroll relative mx-auto py-4 md:py-10 px-4 md:px-20"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-10 top-6 lg:right-20 lg:top-10 cursor-pointer"
                >
                    <X width={24} height={24} />
                </button>

                <div className="flex flex-col gap-8 w-full">
                    {/* Title */}
                    <p className="text-2xl font-coolvetica text-aciu-dark font-bold leading-[125%]">
                        Send a Project Nomination
                    </p>

                    {/* Formik */}
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={projectSchema}
                        validateOnMount
                    >
                        {({ values, setFieldValue, isValid, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="flex flex-col gap-8">
                                        <FormikField
                                            label="Project Title"
                                            name="title"
                                            placeholder="Itumbauzo Road Lighting Project"
                                            fullWidth
                                        />

                                        <FormikField
                                            label="Project Category"
                                            name="category"
                                            options={projectCategoryOptions}
                                            placeholder="Health, Education, Infrastructure, Youth, Elder Welfare"
                                            select
                                            fullWidth
                                        />

                                        <FormikField
                                            label="Location"
                                            name="location"
                                            placeholder="Village/Town/State/Country where this will take place"
                                            fullWidth
                                        />

                                        <FormikField
                                            label="Brief Description"
                                            name="description"
                                            placeholder="What’s the goal of this project and why is it needed?"
                                            fullWidth
                                        />

                                        <FormikField
                                            label="Expected Impact"
                                            name="impact"
                                            placeholder="Who will benefit? What will this project solve or improve?"
                                            fullWidth
                                        />

                                         <FormikField
                                            label="Expected Cost(USD)"
                                            name="cost"
                                            placeholder="Provide an approximate budget if known"
                                            fullWidth
                                        />

                                        <div className="flex flex-col gap-2">
                                            <FormLabel
                                                sx={{
                                                    fontWeight: 500,
                                                    fontFamily: '"Montserrat", sans-serif',
                                                    fontSize: ".875rem",
                                                    color: "#3E3E3E"
                                                }}>
                                                   Upload any related image&nbsp;
                                            </FormLabel>
                                            <div 
                                                className="cursor-pointer"
                                                onClick={() => inputRef.current?.click()}>
                                                {!values.image ?
                                                    <div className="gap-2 flex flex-col">
                                                        <div className="border-2 border-dashed flex flex-col justify-center
                                                            relative h-[13.375rem] rounded-[5px] min-w-[19.5rem] bg-aciu-cyan-light">
                                                                <div
                                                                    className="items-center justify-center
                                                                        text-white font-coolvetica
                                                                        flex flex-col gap-3 w-full">
                                                                    <CloudIcon />
                                                                    <p className="text-aciu-abriba font-montserrat font-medium text-sm">
                                                                        Drag & drop or click to choose file
                                                                    </p>
                                                                </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-montserrat text-grayscale-400 text-sm">
                                                                Supported formats: png & jpg
                                                            </p>
                                                            <p className="font-montserrat text-grayscale-400 text-sm">
                                                                Max: 10mb
                                                            </p>
                                                        </div>
                                                    </div>
                                                    :
                                                       (
                                                        <div className="flex flex-col gap-[.625rem] items-center">
                                                            {typeof values.image === "string" ? (
                                                                <img
                                                                    src={values.image}
                                                                    alt="Project cover"
                                                                    className="rounded-[.625rem] w-full h-[13.375rem] object-cover"
                                                                />
                                                            ) : (
                                                            <img
                                                                src={URL.createObjectURL(values.image)}
                                                                alt="Project cover preview"
                                                                className="rounded-[.625rem] w-full h-[13.375rem] object-cover"
                                                            />
                                                            )}
                                                            <div className="w-full self-end">
                                                                <p className="text-aciu-green-normal font-coolvetica text-2xs">
                                                                    Edit Cover Image
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                            <input
                                                ref={inputRef}
                                                type="file"
                                                accept="image/jpeg, image/png, image/webp, image/jpg"
                                                hidden
                                                onChange={(e) => setFieldValue("image", e.target.files?.[0] || null)}
                                            />
                                        </div>

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
                                                Send Project Nomination
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