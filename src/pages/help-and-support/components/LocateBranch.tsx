import FormikField from "@/components/FormikField"
import { abroadBranches, locationOptions, nigerianBranches } from "@/utils/data"
import { locateBranchSchema } from "@/utils/schemas"
import type { LocateBranchProps } from "@/utils/types"
import { Box, Button, CircularProgress, Dialog, Typography } from "@mui/material"
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
                    minWidth: {
                        xs: "95%",
                        md: "38.25rem"
                    },
                    margin: "0 auto"
                },

                
            }}
        >
            <Box
                sx={{
                    boxSizing: "border-box",
                    py: {
                        xs: "1rem",
                        md: "2.5rem"
                    },
                    px: {
                        xs: "1rem",
                        md: "5rem"
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: ".625rem",
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    margin: "0 auto"
                }}
            >
                <div 
                    onClick={onClose} 
                    className="absolute right-[2.5rem] top-[1.5rem] lg:right-[5rem] lg:top-[2.5rem]"
                >
                    <X width={24} height={24} />
                </div>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="2rem"
                    overflow="hidden"
                    width="100%"
                >
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontFamily: "'Coolvetica', sans-serif",
                            color: "#313131",
                            fontWeight: "bold",
                            lineHeight: "125%"
                        }}
                    >
                        Locate My Branch
                    </Typography>
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={locateBranchSchema}
                        validateOnMount={true}
                    >
                        {({ values, isValid, isSubmitting }) => {
                            const location = values?.location

                            const selectedBranches = location === "nigeria" ?
                                nigerianBranches : abroadBranches;

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
                                            <span className="font-coolvetica text-base">
                                                Find my branch
                                            </span>
                                            {(isSubmitting) &&
                                                <span className="mt-1.5">
                                                    <CircularProgress
                                                        sx={{
                                                            color: "white",
                                                        }}
                                                        size={12} />
                                                </span>
                                            }
                                        </Button>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </Box>
            </Box>
        </Dialog>
    )
}