import AuthCard from "@/components/AuthCard";
import FormikField from "@/components/FormikField";
import { Box, Button, Checkbox, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useLogin } from "@/services/mutations/auth";
import { enqueueSnackbar } from "notistack";

const validationSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginMutation = useLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    setLoading(true);

    try {
      await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      setLoading(false);
      setSubmitting(false);

      enqueueSnackbar("Login successful!", { variant: "success" });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);

      setLoading(false);
      setSubmitting(false);

      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <AuthCard
        header="Login to your account"
        subheader="Enter your details to login"
      >
        <Formik
          validateOnMount={true}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <FormikField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="princeugbuta@gmail.com"
                  fullWidth
                />

                <FormikField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                  fullWidth
                />

                <div className="flex items-center justify-between">
                  <p className="flex gap-2 justify-center font-clash font-medium text-sm text-aciu-border-grey">
                    <span>
                      <Checkbox
                        size="small"
                        sx={{
                          padding: 0,
                          color: "#DFE1E7",
                          "& .MuiCheckbox-root": {
                            width: "1rem",
                            height: "1rem",
                            border: "1px solid #DFE1E7",
                            borderRadius: "4px",
                            backgroundColor: "#F8FAFB",
                            padding: "0",
                          },
                        }}
                      />
                    </span>
                    <span className="mt-[.1rem] text-xs md:text-sm">Keep me logged in</span>
                  </p>

                  <Link
                    to="/forgot-password"
                    className="text-aciu-red text-xs md:text-sm font-coolvetica"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  sx={{
                    color: "white",
                    fontSize: ".75rem",
                    backgroundColor: !isValid ? '#ccc' : '#00B686',
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
                  disabled={isSubmitting || !isValid || loginMutation.isPending}
                  type="submit"
                >
                  <span className="font-coolvetica text-base">Login</span>

                  {(isSubmitting || loading || loginMutation.isPending) && (
                    <span className="mt-1.5">
                      <CircularProgress sx={{ color: "green" }} size={12} />
                    </span>
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </AuthCard>

      <div className="mx-auto w-full">
        <p className="w-full flex justify-center items-center gap-1 font-coolvetica text-xs md:text-base text-aciu-grey">
          Don't have an account?
          <Link to="/signup" className="text-aciu-green-normal text-xs md:text-base">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}