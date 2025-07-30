import AuthCard from "@/components/AuthCard";
import FormikField from "@/components/FormikField";
import { Box, Button, Checkbox, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

const validationSchema = object({
    email: string()
        .email('Invalid email format')
        .required('Email is required'),
    password: string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
});

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: '',
        password: ''
    }

    return (
        <div className="flex flex-col gap-4">
            <AuthCard 
                header="Login to your account"
                subheader="Enter your details to login"
            >
                <Formik
                    validateOnMount={true}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setLoading(true);
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setLoading(false);
                            setSubmitting(false);
                            navigate('/');
                        }, 400);
                    }}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <FormikField 
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    fullWidth
                                />

                                <FormikField 
                                    label="Password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                />
                                <div className="flex items-center justify-between">
                                    <p className="flex gap-2 justify-center font-clash font-medium text-sm text-aciu-border-grey">
                                        <span>
                                        <Checkbox
                                            size="small"
                                            sx={{
                                                padding: 0,
                                                color: '#DFE1E7',
                                                 '& .MuiCheckbox-root': {
                                                    width: '1rem',
                                                    height: '1rem',
                                                    border: '1px solid #DFE1E7',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#F8FAFB', 
                                                    padding: '0',
                                                }
                                            }}
                                        />
                                        </span> 
                                        <span className="mt-[.1rem]">Keep me logged in</span>
                                    </p>
                                    <Link to="/forgot-password" className="text-aciu-red text-sm font-coolvetica">
                                        Forget Password?
                                    </Link>
                                </div>
                                <Button
                                    sx={{
                                        color: 'white',
                                        fontSize: '.75rem',
                                        backgroundColor: !isValid || isSubmitting ? '#ccc' : '#00CA71',
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
                                    disabled={isSubmitting || !isValid}
                                >
                                    <span className="font-coolvetica text-base">Login</span>
                                    {isSubmitting || loading &&
                                        <span>
                                            <CircularProgress size={12} />
                                        </span>
                                    }
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
                
            </AuthCard>
            <div className="mx-auto w-full">
                <p className="w-full flex justify-center items-center gap-1 font-coolvetica text-sm text-aciu-grey">
                    Don't have an account?
                    <Link to='/signup' className="text-aciu-red">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}
