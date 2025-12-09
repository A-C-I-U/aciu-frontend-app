import FormikField from "@/components/FormikField";

export default function ForgotPassword() {
    return (
        <FormikField
            label="Email Address"
            name="email"
            type="email"
            placeholder="princeugbuta@gmail.com"
            fullWidth
        />
    )
}