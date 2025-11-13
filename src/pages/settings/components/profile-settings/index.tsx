import { Avatar, Divider } from "@mui/material";
import DummyProfile from "/images/avatar.png";
import PersonalInfoForm from "./PersonalInfoForm";
import { useState } from "react";
import PersonalInfoModal from "./PersonalInfoModal";
import { Form, Formik } from "formik";
import { useUser } from "@/context/UserContext";
import type { ProfileFormValues } from "@/utils/types";

export default function ProfileSettings() {
    const [openProfileInfo, setOpenProfileInfo] = useState(false);
   
    const { user } = useUser();
    const initialValues: ProfileFormValues = {
        name: user?.name || "",
        email: user?.email || "",
        branch: user?.branch || "", 
        ageGrade: user?.ageGrade || "", 
        occupation: user?.occupation || "",
        phoneNumber: user?.phoneNumber || ""
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="lg:pl-10 hidden lg:flex flex-col gap-2 max-h-fit">
                <p className="font-montserrat lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                    Personal Information
                </p>
                <p className="text-sm lg:text-base">
                    Edit your personal information and update your branch or contact details.
                </p>
            </div>
            <Divider orientation="horizontal" flexItem className="hidden lg:block"/>
            <div className="flex flex-col gap-12 px-2 lg:px-10 flex-1">
                <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                    <Avatar src={DummyProfile} className="rounded-[3.125rem] w-20 h-20" style={{
                        width: "5rem",
                        height: "5rem"
                    }}/>
                    <div className="flex gap-4 items-stretch">
                        <button className="rounded bg-aciu-green-normal py-2.5 px-4 text-white font-coolvetica">
                            Upload New Picture
                        </button>
                        <button className="rounded border border-red-100 py-2.5 px-4 text-red-100 font-coolvetica">
                            Delete
                        </button>
                    </div>
                </div>
               <Formik initialValues={initialValues} onSubmit={() => {}}>
                    <Form className=" w-full lg:max-w-11/12 flex flex-col gap-10">
                        <PersonalInfoForm disableInteractions />
                        <button
                            type="button"
                            onClick={() => setOpenProfileInfo(true)}
                            className="bg-aciu-green-normal rounded py-2.5 px-6 font-coolvetica text-white w-full"
                        >
                            Edit Profile info
                        </button>
                    </Form>
                </Formik>

               
            </div>
            {openProfileInfo &&
                <PersonalInfoModal 
                    initialValues={initialValues}
                    open={openProfileInfo} 
                    onClose={() => setOpenProfileInfo(false)}
                />
            }
        </div>
    )
}