import { Avatar, Divider } from "@mui/material";
import DummyProfile from "/images/avatar.png";
import { Form, Formik } from "formik";
import FormikField from "@/components/FormikField";
import { useUser } from "@/context/UserContext";

export default function ProfileSettings() {
    const { user } = useUser();
    const initialValues = {
        name: user?.name,
        email: user?.email,
        branch: user?.branch, 
        ageGrade: user?.ageGrade, 
        occupation: user?.occupation
    }

    const handleSubmit = (_values: any, _actions: any) => {
        // TODO: Remove underscores when integrating API
    }
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="pl-10 flex flex-col gap-2 max-h-fit">
                <p className="font-montserrat text-xl font-semibold leading-5 text-aciu-border-grey">
                    Personal Information
                </p>
                <p className="">
                    Edit your personal information and update your branch or contact details.
                </p>
            </div>
            <Divider orientation="horizontal" flexItem />
            <div className="flex flex-col gap-12 px-10 flex-1">
                <div className="flex gap-6 items-center">
                    <Avatar src={DummyProfile} className="rounded-[3.125rem] w-20 h-20" />
                    <div className="flex gap-4 items-center">
                        <button className="rounded bg-aciu-green-normal py-2.5 px-4 text-white font-coolvetica">
                            Upload New Picture
                        </button>
                        <button className="rounded border border-red-100 py-2.5 px-4 text-red-100 font-coolvetica">
                            Delete
                        </button>
                    </div>
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col gap-10 max-w-3/5">
                        <FormikField 
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="princeugbuta@gmail.com"
                            fullWidth
                        />

                        <FormikField 
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="princeugbuta@gmail.com"
                            fullWidth
                        />

                        <FormikField 
                            label="Age Grade"
                            name="ageGrade"
                            placeholder="Please input your age grade here"
                            fullWidth
                        />

                        <FormikField
                            label="Branch"
                            name="branch"
                            placeholder="Please input your current branch"
                            fullWidth
                        />

                        <FormikField
                            label="Occupation"
                            name="occupation"
                            placeholder="Please input your occupation"
                            fullWidth
                        />

                        <FormikField
                            label="Phone Number"
                            name="phoneNumber"
                            placeholder="Please input your phone number"
                            fullWidth
                        />

                        <button className="bg-aciu-green-normal rounded py-2.5 px-6 font-coolvetica text-white w-full">
                            Edit Profile info
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}