import FormikField from "@/components/FormikField";
import { FieldArray, useFormikContext } from "formik";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormLabel } from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";

export default function DateTimeForm() {
    const { values, setFieldValue, touched, errors } = useFormikContext<any>();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                    Date & Time
                </p>

                <div className="flex flex-col gap-4 lg:gap-2 justify-between items-start w-full">
                    <div className="flex flex-col gap-2 items-start w-full">
                        <FormLabel
                            sx={{
                              fontFamily: "'Montserrat', sans-serif",
                              color: '#3E3E3E',
                              fontWeight: 500,
                              fontSize: '0.875rem'
                            }}
                        >
                            Event Date
                        </FormLabel>
                        <DatePicker
                            name="eventDate"
                            value={values.eventDate ? dayjs(values.eventDate) : null}
                            onChange={(newValue) => setFieldValue("eventDate", dayjs(newValue))}
                            className="w-full h-unset py-2"
                            sx={{
                                '& .MuiInputLabel-root': {
                                    fontSize: '.875rem'
                                },
                                '& .MuiPickersInputBase-root': {
                                    fontSize: ".875rem"
                                },
                                '& .MuiPickersOutlinedInput-root': {
                                    borderRadius: ".5rem",
                                    borderColor: "#DFE1E7",
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-3.5 md:gap-2 items-start w-full">
                        <FormLabel
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: '#3E3E3E',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                            }}
                        >
                            Event Time
                        </FormLabel>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-center w-full">
                            <TimePicker
                                name="startTime"
                                value={values.startTime ? dayjs(values.startTime, "HH:mm") : null} 
                                onChange={(newValue) => {
                                    setFieldValue("startTime", newValue)
                                    if (
                                        values.endTime &&
                                        newValue &&
                                        dayjs(values.endTime, "HH:mm").isBefore(newValue)
                                    ) {
                                        setFieldValue("endTime", newValue);
                                    }
                                }}
                                label="Start"
                                className="w-full"
                                slotProps={{
                                    textField: {
                                        sx: {
                                            flex: 1,
                                            '& .MuiInputLabel-root': {
                                                fontSize: '.875rem'
                                            },
                                            '& .MuiPickersInputBase-root': {
                                                fontSize: ".875rem"
                                            },
                                            '& .MuiPickersOutlinedInput-root': {
                                                borderRadius: '.5rem',
                                                fontSize: ".875rem"
                                            },
                                        },
                                    },
                                }}
                            />
                            <TimePicker
                                name="endTime"
                                label="End"
                                value={values.endTime ? dayjs(values.endTime, "HH:mm") : null} 
                                minTime={values.startTime ? dayjs(values.startTime, "HH:mm") : undefined}
                                onChange={(newValue) => {
                                    setFieldValue("endTime", newValue)
                                }}
                                className="w-full"
                                slotProps={{
                                    textField: {
                                        error: !!(touched.endTime && errors.endTime),
                                        sx: {
                                            flex: 1,
                                            '& .MuiInputLabel-root': {
                                                fontSize: '.875rem'
                                            },
                                            '& .MuiPickersInputBase-root': {
                                                fontSize: ".875rem"
                                            },
                                            '& .MuiPickersOutlinedInput-root': {
                                                borderRadius: '.5rem',
                                                fontSize: ".875rem"
                                            },
                                        },
                                    },
                                }}
                            />
                            
                        </div>
                        {touched.endTime && errors.endTime && (
                            <span className="text-xs text-red-600 font-medium font-montserrat">
                                {errors.endTime as string}
                            </span>
                        )}
                    </div>
                </div>

                <FormikField
                    name="eventLocation"
                    label="Event Location/link"
                    placeholder="Add the event address/link to the location"
                    fullWidth
                />

            </div>
            <div className="flex flex-col gap-6">
                <p className="text-lg font-semibold leading-5 text-aciu-border-grey">
                    Event Highlights
                </p>
                <FieldArray name="eventHighlights">
                    {({ push, remove }) => (
                        <>
                            {values.eventHighlights.map((_: any, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <FormikField
                                        name={`eventHighlights[${index}]`}
                                        label={`Event Highlight ${index + 1}`}
                                        placeholder="Add an event highlight"
                                        fullWidth
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 text-xs"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => push("")}
                                className="text-aciu-green-normal font-coolvetica text-left"
                            >
                                + Add more
                            </button>
                        </>
                    )}
                    </FieldArray>
            
            </div>
        </div>
    )
}