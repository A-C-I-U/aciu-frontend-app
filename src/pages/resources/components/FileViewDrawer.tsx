import FormikField from "@/components/FormikField";
import { ScrollLock } from "@/components/ScrollLock";
import { formatSize, getExtension } from "@/utils/helpers";
import type { FileViewDrawerProps } from "@/utils/types";
import { capitalize, Divider, Drawer } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";

export default function FileViewDrawer({
    file,
    name,
    description,
    open,
    onClose,
}: FileViewDrawerProps) {
    const size = formatSize(file.size);
    const extension = getExtension(file);

    const initialValues = {
        fileName: name,
        fileDescription: description
    }

    return (
        <>
        <ScrollLock open={open} />
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            disableScrollLock={false}
            sx={{
                "& .MuiDrawer-paper": {
                    width: "40%",
                    maxWidth: "70%",
            }
        }}
        >
            <div className="flex flex-col gap-4 w-full h-full relative">
                <p className="text-aciu-dark font-coolvetica leading-[125%] px-5.5 pt-4.5 text-2xl">
                    View resources
                </p>
                <button
                    onClick={onClose}
                    className="absolute right-5 top-4 cursor-pointer"
                > 
                    <X width={24} height={24} color="#3E3E3E"/>
                </button>
                <div className="w-full flex items-center justify-center px-5.5 pb-4.5">
                    <div className="mt-16 py-12.5 px-9 w-65 h-52 rounded-xl bg-card-200 flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center justify-center w-22 h-22 rounded-lg bg-aciu-dashboard-background">
                            <p className="font-montserrat text-sm">
                                {capitalize(extension)}
                            </p>
                        </div>
                        <p className="font-montserrat font-medium text-xs text-aciu-border-grey">
                            {size}
                        </p>
                    </div>   
                </div>
                <Divider orientation="horizontal" className="mt-16 text-aciu-dashboard-background" flexItem />
                <Formik initialValues={initialValues} onSubmit={() => {}}>
                    <Form className="flex-1 overflow-y-auto  mt-13.5 px-5.5 flex flex-col gap-4">
                        <FormikField
                            label="File Name"
                            name="fileName"
                            placeholder={name}
                            disabled
                            fullWidth
                        />
                        <FormikField
                            label="File Description"
                            name="fileDescription"
                            placeholder={description}
                            disabled
                            fullWidth
                        />
                    </Form>
                </Formik>
                
                <div className="px-5.5 mb-4 flex items-center gap-2">
                    <button
                        className="p-4 gap-2 rounded-xl bg-aciu-green-normal text-white font-coolvetica
                            w-full"
                        >
                            Edit Resource
                    </button>
                    <button
                        className="p-4 gap-2 rounded-xl border border-aciu-dashboard-background text-aciu-border-grey w-full"
                        >
                            Archive Resource
                    </button>
                </div>
            </div>
        </Drawer>
        </>
    )
}