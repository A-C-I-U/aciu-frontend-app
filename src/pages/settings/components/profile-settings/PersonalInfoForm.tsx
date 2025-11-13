import FormikField from "@/components/FormikField";


export default function PersonalInfoForm({
    disableInteractions = false
}: { disableInteractions?: boolean}) {
   
    
    return (
            <>
                <FormikField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="princeugbuta@gmail.com"
                    disabled
                    fullWidth
                />

                <FormikField 
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="princeugbuta@gmail.com"
                    disabled
                    fullWidth
                />

                <FormikField 
                    label="Age Grade"
                    name="ageGrade"
                    placeholder="Please input your age grade here"
                    disabled
                    fullWidth
                />

                <FormikField
                    label="Branch"
                    name="branch"
                    placeholder="Please input your current branch"
                    disabled
                    fullWidth
                />

                <div className={`${disableInteractions ? "pointer-events-none" : ""}`}>
                    <FormikField
                        label="Occupation"
                        name="occupation"
                        placeholder="Please input your occupation"
                        fullWidth
                    />
                </div>

                <div className={`${disableInteractions ? "pointer-events-none" : ""}`}>
                    <FormikField
                        label="Phone Number"
                        name="phoneNumber"
                        placeholder="Please input your phone number"
                        fullWidth
                    />
                </div>
            </>
    )
}