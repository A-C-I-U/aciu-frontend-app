import FormikField from "@/components/FormikField";
import { changePasswordSchema } from "@/utils/schemas";
import type { DialogFuncProps } from "@/utils/types";
import { CircularProgress, Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { useChangePassword } from "@/services/hooks/settings";
import { enqueueSnackbar } from "notistack";

interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: ChangePasswordValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePassword({ open, onClose }: DialogFuncProps) {
  const changePasswordMutation = useChangePassword();

  const handleSubmit = async (values: ChangePasswordValues, actions: any) => {
    try {
      const payload = {
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      const result = await changePasswordMutation.mutateAsync(payload);

      enqueueSnackbar(result.message || "Password changed successfully", {
        variant: "success",
      });

      actions.setSubmitting(false);
      actions.resetForm();
      onClose(); 
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to change password";
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });

      actions.setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={(_event, reason) => {
        if (reason !== "backdropClick" && !changePasswordMutation.isPending) {
          handleClose();
        }
      }}
      open={open}
      disableScrollLock={false}
      sx={{
        "& .MuiDialog-paper": {
          overflow: "hidden",
          width: {
            xs: "92%",
            md: "38.25rem",
          },
          margin: "0 auto",
          position: "relative",
        },
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid, dirty, resetForm }) => (
          <Form className="relative flex flex-col gap-8 h-4/5 w-full bg-white rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 pt-5 lg:px-20 lg:pt-10.5">
              <h3 className="text-xl md:text-2xl text-aciu-dark">
                Change Password
              </h3>
              <button
                type="button"
                className="absolute top-5 lg:top-7.5 right-8"
                onClick={() => {
                  if (!changePasswordMutation.isPending) {
                    resetForm();
                    handleClose();
                  }
                }}
                disabled={changePasswordMutation.isPending}
              >
                <X size={24} color="#3E3E3E" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 lg:px-20 pb-10 w-full">
              <div className="flex flex-col gap-10">
                <FormikField
                  label="Old password"
                  name="oldPassword"
                  type="password"
                  placeholder="Type in your old password"
                  fullWidth
                  disabled={isSubmitting}
                />
                <FormikField
                  label="New password"
                  name="newPassword"
                  type="password"
                  placeholder="Type in your new password"
                  fullWidth
                  disabled={isSubmitting}
                />
                <FormikField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-type your new password"
                  fullWidth
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="w-full px-6 lg:px-20 pb-6">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !isValid ||
                  !dirty ||
                  changePasswordMutation.isPending
                }
                className="bg-aciu-green-normal disabled:bg-gray-400 disabled:cursor-not-allowed 
                rounded-xl p-4 font-coolvetica text-white w-full hover:bg-aciu-green-dark transition-colors
                flex items-center justify-center"
              >
                {changePasswordMutation.isPending ? (
                  <>
                    <CircularProgress
                      size={16}
                      className="mr-2"
                      style={{ color: "white" }}
                    />
                    Changing Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
