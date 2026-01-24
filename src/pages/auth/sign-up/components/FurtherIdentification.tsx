import FormikField from "@/components/FormikField";
import { 
    abroadBranches,
    ageGradeOptions,
    genderOptions, 
    locationOptions, 
    nigerianBranches, 
    villageOptions } from "@/utils/data";
import { Box, MenuItem } from "@mui/material";
import { useFormikContext } from "formik";

export default function FurtherIdentification() {
    const { values } = useFormikContext<any>();
    const location = values?.location;
    const selectedBranches = location === "nigeria" ?
        nigerianBranches : abroadBranches;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <FormikField
                label="Gender"
                name="gender"
                type="select"
                select={true}
                placeholder="Are you a man or a woman?"
                options={genderOptions}
                fullWidth
            >
                <MenuItem 
                    value="" 
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                        }}
                    disabled
                    >
                    Are you a man or a woman?
                </MenuItem>
                {...genderOptions.map((option, index) => (
                    <MenuItem 
                        key={option.value} 
                        value={option.value}
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                            paddingBottom: ".75rem",
                            borderBottom: index === genderOptions.length - 1 ? '0' : '1px solid #E2E2E2',
                        }}>
                        {option.label}
                    </MenuItem>
                ))}
            </FormikField>
            <FormikField
                label="Select Branch Location"
                name="location"
                type="text"
                options={locationOptions}
                placeholder="Choose the location of your branch"
                select={true}
                fullWidth
            >
                <MenuItem 
                    value="" 
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                        }}
                    disabled
                >
                    Choose the location of your branch
                </MenuItem>
                {...locationOptions.map((option, index) => (
                    <MenuItem 
                        key={option.value} 
                        value={option.value}
                        sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: "#3E3E3E",
                                fontSize: ".875rem",
                                paddingBottom: ".75rem",
                                borderBottom: index === locationOptions.length - 1 ? '0' : '1px solid #E2E2E2',
                            }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </FormikField>
             <FormikField
                label="Select Branch"
                name="branch"
                type="text"
                options={selectedBranches}
                select={true}
                placeholder="Choose the ACIU branch you belong to"
                fullWidth
            >
                <MenuItem 
                    value="" 
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                            paddingBottom: ".75rem",
                        }}
                    disabled
                >
                    Choose the ACIU branch you belong to
                </MenuItem>
                {...selectedBranches.map((option, index) => (
                    <MenuItem 
                        key={option.value} 
                        value={option.value}
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                            paddingBottom: ".75rem",
                            borderBottom: index === selectedBranches.length - 1 ? '0' : '1px solid #E2E2E2',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </FormikField>
            
            <FormikField
                label="Village"
                name="village"
                type="text"
                options={villageOptions}
                select={true}
                placeholder="Select your village — Ameke, Amogudu or Agboji"
                fullWidth
            >
                <MenuItem 
                    value="" 
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                            paddingBottom: ".75rem",
                        }}
                        disabled
                    >
                    Select your village — Ameke, Amogudu or Agboji
                </MenuItem>
                {...villageOptions.map((option, index) => (
                    <MenuItem 
                        key={option.value} 
                        value={option.value}
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                            paddingBottom: ".75rem",
                            borderBottom: index === villageOptions.length - 1 ? '0' : '1px solid #E2E2E2',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </FormikField>
            <FormikField
                label="Age Grade"
                name="ageGrade"
                type="text"
                options={ageGradeOptions}
                placeholder="Select your age grade"
                select={true}
                fullWidth
            >
                <MenuItem 
                    value="" 
                    sx={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#3E3E3E",
                        fontSize: ".875rem",
                    }}
                    disabled
                >
                   Select your age grade
                </MenuItem>
                {...ageGradeOptions.map((option, index) => (
                    <MenuItem 
                        key={option.value} 
                        value={option.value}
                        sx={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#3E3E3E",
                            fontSize: ".875rem",
                            paddingBottom: ".75rem",
                            borderBottom: index === ageGradeOptions.length - 1 ? '0' : '1px solid #E2E2E2',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </FormikField>
            <FormikField
                label="Occupation"
                name="occupation"
                placeholder="What do you do (e.g. Student, Trader, Teacher)"
                type="text"
                fullWidth
            />
        </Box>
    )
}