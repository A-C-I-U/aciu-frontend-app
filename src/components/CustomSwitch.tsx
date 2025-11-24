import Switch from "@mui/material/Switch";

interface CustomSwitchProps {
  checked: boolean;
  fieldName: string;
  onChange: (fieldName: string, value: boolean) => void;
  sx?: any;
}

export default function CustomSwitch ({ 
    checked, 
    fieldName, 
    onChange, 
    sx 
}: CustomSwitchProps) {

    return (
        <Switch
            checked={checked}
            onChange={(e) => onChange(fieldName, e.target.checked)}
            sx={{
                width: "3.75rem",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "& .MuiSwitch-switchBase": {
                    transform: "translate(.275rem, -50%)",
                    top: "50%",
                },
                "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#fff",
                    transform: "translate(1.25rem, -50%)",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#00B686",
                    opacity: 1,
                },
                "& .MuiSwitch-track": {
                    borderRadius: "99999px",
                    backgroundColor: "#d1d5db",
                    opacity: 1,
                    height: "1.25rem",
                },
                "& .MuiSwitch-thumb": {
                    width: "1.125rem",
                    height: "1.125rem",
                },
                ...((sx as any) || {}),
            }}
        />
    );
};