import { useState } from 'react';
import { useField } from 'formik';
import { TextField, InputAdornment, IconButton, FormLabel, MenuItem } from '@mui/material';
import { ArrowDown2, Eye, EyeSlash } from 'iconsax-react';


type FormikFieldProps = {
  label: string;
  name: string;
  placeholder?: React.ReactNode;
  required?: boolean;
  type?: string;
  select?: boolean;
  textarea?: boolean;
  options?: {
    value: string,
    label: string
  }[];
  rows?: number;
  [key: string]: any;
};

export default function FormikField({ 
  label, 
  placeholder,
  required,
  options,
  type = "text", 
  select = false, 
  textarea = false,
  rows = 4,
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
        {label}{required && "*"}
      </FormLabel>
      <TextField
        {...field}
        {...props}
        select={select}
        multiline={textarea}
        rows={rows}
        type={isPasswordField && showPassword ? 'text' : type}
        placeholder={placeholder as string}
        label={!select ? placeholder : ''}
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
              sx: {
                fontFamily: "'Montserrat', sans-serif",
                fontSize: ".625rem",
                borderRadius: ".5rem",
                "& .MuiMenuItem-root": {
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: ".875rem",
                  color: "#3E3E3E",
                  borderBottom: "1px solid #E2E2E2",
                  "&:last-of-type": {
                    borderBottom: "none",
                  },
                  "&:hover": {
                    backgroundColor: "#F9FFFB",
                    color: "#00B686",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#E5FFF3",
                    color: "#00B686",
                    fontWeight: 600,
                  },
                  "&[data-value='']": {
                    backgroundColor: "transparent",
                    color: "#9CA3AF"
                  }
                },
              }
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
          },
        }}
        >
          {options && 
          [
            <MenuItem key="placeholder" value="" defaultValue="" disabled>
              {placeholder}
            </MenuItem>,
            ...options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} defaultValue={opt.value}>
                {opt.label}
              </MenuItem>
            ))
          ]}

        </TextField>
      {meta.touched && meta.error && (
        <span className="text-xs text-red-600 font-medium font-montserrat">
          {meta.error as string}
        </span>
      )}
    </div>
  );
}
