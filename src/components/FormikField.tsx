import { useState } from 'react';
import { useField } from 'formik';
import { TextField, InputAdornment, IconButton, FormLabel } from '@mui/material';
import { ArrowDown2, Eye, EyeSlash } from 'iconsax-react';


type FormikFieldProps = {
  label: string;
  name: string;
  placeholder?: React.ReactNode;
  type?: string;
  select?: boolean;
  options?: {
    value: string,
    label: string
  }[];
  [key: string]: any;
};

export default function FormikField({ 
  label, 
  placeholder,
  options,
  type = "text", 
  select = false, 
  ...props }: FormikFieldProps) {

  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <FormLabel
        sx={{
          fontFamily: "'Montserrat', sans-serif",
          color: '#3E3E3E',
          fontWeight: 500,
          fontSize: '0.875rem'
        }}
      >
        {label}
      </FormLabel>
      <TextField
        {...field}
        {...props}
        select={select}
        type={isPasswordField && showPassword ? 'text' : type}
        placeholder={placeholder as string}
        label={placeholder}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        slotProps={{
          select: {
            endAdornment: select && (
              <InputAdornment position="end">
                <ArrowDown2 variant='Linear' size={20} color="#3E3E3E" />
              </InputAdornment>
            ),
            IconComponent: () => null,
            MenuProps: {
              hideBackdrop: true, 
              disableScrollLock: true,
            },
            displayEmpty: true,
          },
          input: {
            endAdornment: isPasswordField && (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? 
                    <EyeSlash size={20} variant='Linear' color='#737373'/> : 
                    <Eye size={20} variant='Linear' color='#737373' />
                  }
                </IconButton>
              </InputAdornment>
            ),
        }}}
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '.875rem',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            color: '#737373',
            '& .MuiOutlinedInput-input': {
              color: '#3E3E3E !important',
            },
            '& fieldset': {
              top: "0px",
              borderTop: '1px solid #DFE1E7',
              '& legend': {
                display: 'none',
              },
            },
            '&:hover fieldset': {
              border: '1px solid #00CA71',
            },
            '&.Mui-focused fieldset': {
              border: '2px solid #00CA71',
            },
            '&.Mui-error fieldset': {
              border: '2px solid #d32f2f',
            },
          },

          '& .MuiInputLabel-root': {
            fontWeight: 500,
            fontSize: '.875rem',
            fontFamily: "'Montserrat', sans-serif",
            color: '#737373',
          },
          '& .MuiInputLabel-shrink': {
            display: 'none',
          },
          '& .MuiInputLabel-outlined': {
            fontWeight: 500,
            fontSize: '.875rem',
            fontFamily: "'Montserrat', sans-serif",
            color: '#737373',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #DFE1E7',
            borderRadius: '.625rem',
          },
          "& .MuiFormHelperText-root": {
            display: "none",
          },
          "& .MuiInputBase-inputAdornedEnd": {
            width: "100%",
          }
        }}

      />
      {meta.touched && meta.error && (
        <span className="text-xs text-red-600 font-medium font-montserrat">
          {meta.error as string}
        </span>
      )}
    </div>
  );
}
