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
    
     const handleSubmit = async (_values: any, _actions: any) => {
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
                    <div className="flex flex-col w-full h-4/5 relative mx-auto overflow-hidden">
                        <p className="text-xl font-coolvetica text-aciu-dark font-bold leading-[125%] pt-4 md:pt-10 px-4 md:px-20">
                            Locate My Branch
                        </p>

                        <button
                            onClick={onClose}
                            className="absolute right-10 top-6 lg:right-20 lg:top-10 cursor-pointer"
                        >
                            <X width={24} height={24} />
                        </button>

                            <Form>
                                <div className="flex-1 overflow-y-auto flex flex-col gap-4 pt-8 pb-4 md:pb-10 px-4 md:px-20">
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
                                        select
                                        placeholder="Choose the ACIU branch you belong to"
                                        fullWidth
                                    />
                                </div>
                                <div className="pb-4 md:pb-10 px-4 md:px-20">
                                    <Button
                                        sx={{
                                            color: "white",
                                            fontSize: ".75rem",
                                            backgroundColor: !isValid ? "#ccc" : "#00B686",
                                            borderRadius: ".75rem",
                                            padding: "1rem",
                                            width: "100%",
                                            boxShadow: "0px 1px 2px 0px #0D0D120A",
                                            textTransform: "none",
                                            display: "flex",
                                            gap: 1,
                                            alignItems: 'center',
                                            "&.Mui-disabled": {
                                                backgroundColor: "#e0e0e0",
                                                color: "#9e9e9e",
                                                opacity: 0.6,
                                            },
                                        }}
                                        disabled={isSubmitting || !isValid}
                                        type="submit"
                                    >
                                        <span className="font-coolvetica text-base">
                                            Find my branch
                                        </span>

                                        {isSubmitting && (
                                            <CircularProgress sx={{ color: "white" }} size={12} />
                                        )}
                                    </Button>
                                </div>
                            </Form>
                    </div>
                )}}
            </Formik>
        </Dialog>
    )
}