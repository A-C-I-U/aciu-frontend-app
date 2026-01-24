// import FormikField from "@/components/FormikField";
// import FormikPhoneInput from "@/components/FormikPhoneInput";
// import { Box } from "@mui/material";

// export default function AccountCreation() {
//     return (
//          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//             <FormikField
//                 label="Full Name"
//                 name="fullName"
//                 type="text"
//                 placeholder="John Doe"
//                 fullWidth
//             />
//             <FormikField
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 placeholder="johndoe@gmail.com"
//                 fullWidth
//             />
//             <FormikPhoneInput
//                 label="Phone Number"
//                 name="phoneNumber"
//             />
//             <FormikField 
//                 label="Password"
//                 name="password"
//                 type="password"
//                 placeholder="********"
//                 fullWidth
//             />
//         </Box>
//     )
// }

// AccountCreation.tsx
import FormikField from "@/components/FormikField";
import FormikPhoneInput from "@/components/FormikPhoneInput";
import { Box } from "@mui/material";

export default function AccountCreation() {
    return (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <FormikField
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="John Doe"
                fullWidth
            />
            <FormikField
                label="Email Address"
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
                fullWidth
            />
            <FormikPhoneInput
                label="Phone Number"
                name="phoneNumber"
                
            />
            <FormikField 
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                fullWidth
            />
            <FormikField 
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="********"
                fullWidth
            />
        </Box>
    )
}