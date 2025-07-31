import { Box, OutlinedInput } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React, { useRef, useEffect } from 'react';

type OtpProps = {
  name: string;
};

const OtpInput: React.FC<OtpProps> = ({ name }: OtpProps) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [field, _, helpers] = useField(name);
    const { setFieldTouched } = useFormikContext();

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
        const otpArray = field.value.split('');
        otpArray[index] = val;
        helpers.setValue(otpArray.join(''));

        if (val && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleOnKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const key = e.key;
        if (key === 'Backspace') {
            const otpArray = field.value.split('');
            otpArray[index] = '';
            helpers.setValue(otpArray.join(''));

            if (index > 0 && !field.value[index]) {
                inputsRef.current[index - 1]?.focus();
                e.preventDefault();
            }
        }
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const handleOnBlur = () => {
        setFieldTouched(name, true);
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('Text').replace(/\D/g, '');
        if (pasted.length > 0) {
            const newValue = pasted.slice(0, 6).padEnd(6, '').split('');
            helpers.setValue(newValue.join(''));

            const targetIndex = Math.min(pasted.length - 1, 5);
                inputsRef.current[targetIndex]?.focus();
            }
        e.preventDefault();
    };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      {Array.from(Array(6).keys()).map((i) => (
        <OutlinedInput
            key={i}
            value={field.value?.[i] ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, i)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(e, i)}
            onFocus={handleOnFocus}
            onPaste={handleOnPaste}
            onBlur={i === 5 ? handleOnBlur : undefined}
            inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
                ref: (el: HTMLInputElement | null) => {
                    inputsRef.current[i] = el;
                },
            }}
            type="tel"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            sx={{
                height: 56,
                width: 60,
                mr: 0.5,
                ml: 0.5,
                color: "#3E3E3E",
                backgroundColor: "#F4F4F4",
                borderRadius: ".75rem",
                fontSize: "1.5rem",
                fontFamily: "Clash Grotesk, 'sans-serif'",
                fontWeight: "600",
                    '&. fieldset': {
                        border: "1px solid #E2E2E2"
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00CA71',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00CA71',
                        borderWidth: '1px',
                    },
                }}
                className='input-shadow'
            />

      ))}
    </Box>
  );
};

export default OtpInput;