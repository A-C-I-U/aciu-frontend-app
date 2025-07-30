import React from 'react';
import { useFormikContext } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormLabel } from '@mui/material';

interface FormikPhoneInputProps {
  name: string;
  label?: string;
  defaultCountry?: string;
}

const FormikPhoneInput: React.FC<FormikPhoneInputProps> = ({
  name,
  label,
  defaultCountry = 'ng',
}) => {
  const { 
    values, 
    touched, 
    errors, 
    setFieldValue, 
    handleBlur } = useFormikContext<any>();
  const error = touched[name] && errors[name];

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <FormLabel
          htmlFor={name}
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: ".875rem",
            color: "#3E3E3E",
            fontWeight: "500"
          }}
        >
          {label}
        </FormLabel>
      )}
      <PhoneInput
        country={defaultCountry}
        value={values[name]}
        onChange={(val: string) => {
            setFieldValue(name, `+${val}`)
        }}
        onBlur={() => handleBlur({ target: { name } })}
        inputProps={{
          name,
        }}
        inputStyle={{
          width: '100%',
          height: '3.5rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: '500',
          fontSize: '.875rem',
          border: error ? '2px solid #d32f2f' : '1px solid #DFE1E7',
          borderRadius: '10px',
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
          border: 'none'
        }}
        dropdownStyle={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '.875rem',
        }}
        enableSearch
      />
      {error && (
        <span className="text-xs text-red-600 font-medium mt-1 font-montserrat">
          {errors[name] as string}
        </span>
      )}
    </div>
  );
};

export default FormikPhoneInput;
