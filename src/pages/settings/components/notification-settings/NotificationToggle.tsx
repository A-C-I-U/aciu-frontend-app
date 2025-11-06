import { FormControlLabel, Switch } from "@mui/material";

export const NotificationToggle = ({ label, description, fieldName, checked, onChange }: {
    label: string,
    description: string,
    fieldName: string,
    checked: boolean,
    onChange: (fieldName: string, checked: boolean) => void
}) => (
    <div className="flex justify-between">
        <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs leading-5 text-aciu-abriba">{description}</p>
        </div>
        <FormControlLabel
            sx={{
                marginLeft: 0,
                marginRight: 0,
                "& .MuiFormControlLabel-label": {
                    color: "#737373",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: ".75rem",
                },
            }}
            control={
            <Switch
                checked={checked}
                onChange={(e) => onChange(fieldName, e.target.checked)}
                sx={{
                height: "2.625rem",
                width: "3.625rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#fff",
                    padding: "10px",
                    transform: "translateX(1rem)",
                },
                "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                    backgroundColor: "#00B686",
                    opacity: 1,
                }
                }}
            />
            }
            label=""
        />
    </div>
);
