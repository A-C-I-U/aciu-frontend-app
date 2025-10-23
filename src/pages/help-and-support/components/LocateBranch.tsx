import FormikField from "@/components/FormikField"
import { abroadBranches, locationOptions, nigerianBranches } from "@/utils/data"
import { locateBranchSchema } from "@/utils/schemas"
import type { LocateBranchProps } from "@/utils/types"
import { Button, CircularProgress, Dialog } from "@mui/material"
import { Form, Formik } from "formik"
import { X } from "lucide-react"


export default function LocateBranch({
    open,
    onClose,
    onBranchLocation
}: LocateBranchProps) {

    const initialValues = {
        location: "",
        branch: ""
    }
    
     const handleSubmit = async (values: any, actions: any) => {
        console.log(values, actions);
        onBranchLocation();
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
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
            <div
                className="flex flex-col gap-2.5 w-full overflow-hidden relative mx-auto py-4 md:py-10 px-4 md:px-20"
            >
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute right-10 top-6 lg:right-20 lg:top-10 cursor-pointer"
                >
                    <X width={24} height={24} />
                </button>

                {/* Dialog Content */}
                <div className="flex flex-col gap-8 overflow-hidden w-full">
                    <p className="text-xl font-coolvetica text-aciu-dark font-bold leading-[125%]">
                        Locate My Branch
                    </p>

                {/* Formik */}
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={locateBranchSchema}
                        validateOnMount={true}
                    >
                        {({ values, isValid, isSubmitting }) => {
                        const location = values?.location;
                        const selectedBranches =
                            location === "nigeria" ? nigerianBranches : abroadBranches;

                        return (
                            <Form>
                                <div className="flex flex-col gap-4">
                                    <FormikField
                                        label="Select Branch Location"
                                        name="location"
                                        options={locationOptions}
                                        placeholder="Choose the location of your branch"
                                        select
                                        fullWidth
                                    />

                                    <FormikField
                                        label="Select Branch"
                                        name="branch"
                                        type="text"
                                        options={selectedBranches}
                                        select={true}
                                        placeholder="Choose the ACIU branch you belong to"
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
                                            Find my branch
                                        </span>

                                        {isSubmitting && (
                                            <span className="mt-1.5">
                                                <CircularProgress sx={{ color: "white" }} size={12} />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        );
                        }}
                    </Formik>
                </div>
            </div>
        </Dialog>
    )
}