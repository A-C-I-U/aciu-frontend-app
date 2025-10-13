import FormikField from "@/components/FormikField";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";

const contactUsSchema = object({
    fullName: string().required('Full name is required'),
    email: string().email("Invalid email address").required("Email is required"),
    phoneNumber: string()
        .matches(/^\+\d{10,15}$/, 'Must be a valid phone number with country code')
        .required('Phone number is required'),
    messageBox: string().required('Kindly write extensively what your query is here')
})

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
            <Box
                borderRadius=".625rem"
                py="1.875rem"
                px=".938rem"
                display="flex"
                flexDirection="column"
                gap={6}
                bgcolor="white"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1.125rem"
                >
                    <button
                        className="rounded-[.625rem] 
                        border border-aciu-green-normal 
                        px-[1.4rem] py-[.9rem] max-w-fit
                        text-xs text-aciu-green-normal"
                    >
                        Contact us
                    </button>
                    <h2 className="
                        font-montserrat font-semibold text-[24px] leading-[2.75rem]"
                    >
                        Still Need Help?
                    </h2>
                </Box>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={contactUsSchema}
            >
                {({ isValid, isSubmitting }) => {
                    return (
                        <Form>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4
                                }}
                            >
                                <FormikField
                                    label="Full Name"
                                    name="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    fullWidth
                                />
                                <FormikField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    fullWidth
                                />
                                <FormikField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    // placeholder=""
                                />
                                <FormikField
                                    label="Message Box"
                                    name="messageBox"
                                    type="text"
                                    placeholder="Kindly write extensively what your enquiry is here"
                                    fullWidth
                                />
                            </Box>
                            <Button
                                sx={{
                                    color: 'white',
                                    fontSize: '.75rem',
                                    backgroundColor: !isValid ? '#ccc' : '#00B686',
                                    borderRadius: '.75rem',
                                    padding: '1rem',
                                    boxShadow: '0px 1px 2px 0px #0D0D120A',
                                    textTransform: 'none',
                                    '&.Mui-disabled': {
                                        backgroundColor: '#e0e0e0',
                                        color: '#9e9e9e',
                                        opacity: 0.6,
                                    }
                                }}
                                className="flex gap-2 items-center"
                                disabled={isSubmitting || !isValid}
                                type="submit"
                            >
                                Submit Report
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    </>
    )
}