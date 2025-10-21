import FormikField from "@/components/FormikField";
import { contactUsSchema } from "@/utils/schemas";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";

export default function ContactUsForm() {
    const handleSubmit = async (values: any, actions: any) => {
        console.log(values, actions);
    }

    const initialValues = {
        fullName: "",
        email: "",
        phoneNumber: "",
        messageBox: ""
    }

    return (
       <>
            <div
                className="flex flex-col gap-6 bg-white rounded-[0.625rem] py-7.5 px-3.5"
            >
                {/* Header */}
                <div className="flex flex-col gap-4.5">
                    <button
                        className="rounded-[.625rem] font-semibold border border-aciu-green-normal 
                            font-coolvetica px-5.5 py-3.5 max-w-fit text-xs 
                            text-aciu-green-normal cursor-default"
                    >
                        Contact us
                    </button>

                    <h2 className="font-montserrat font-semibold text-2xl leading-11">
                        Still Need Help?
                    </h2>
                </div>

                {/* Contact Form */}
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={contactUsSchema}
                    validateOnMount
                >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <div className="flex flex-col gap-4">
                            <FormikField
                                label="Full Name"
                                name="fullName"
                                type="text"
                                placeholder="John Doe"
                                fullWidth
                                required
                            />
                            <FormikField
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                fullWidth
                                required
                            />
                            <FormikField
                                label="Phone Number"
                                name="phoneNumber"
                                placeholder="09038283447"
                                fullWidth
                                required
                            />
                            <FormikField
                                label="Message Box"
                                name="messageBox"
                                type="text"
                                placeholder="Kindly write extensively what your enquiry is here"
                                textarea
                                rows={5}
                                fullWidth
                                required
                            />
                        </div>

                        <Button
                            sx={{
                            mt: "2rem",
                            color: "white",
                            fontFamily: "'Coolvetica', sans-serif",
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
                            Submit Report
                        </Button>
                    </Form>
                )}
                </Formik>
            </div>
         </>
    )
}