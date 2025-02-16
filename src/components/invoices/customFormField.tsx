import React from "react";
import { TextField, MenuItem, InputAdornment, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { styled } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface CustomFormFieldProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  required?: boolean;
  type?: "text" | "number" | "date" | "currency" | "select";
  options?: { label: string; value: string | number }[];
  placeholder?: string;
}

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#bdbdbd",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px",
  },
});

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  name,
  control,
  label,
  required = false,
  type = "text",
  options = [],
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {type === "currency" ? (
            <NumericFormat
              {...field}
              customInput={TextField}
              thousandSeparator=","
              decimalSeparator="."
              prefix="Rp "
              fullWidth
              label={label}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              placeholder={placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              onValueChange={(values) => field.onChange(values.value)}
            />
          ) : type === "select" ? (
            <TextField
              select
              fullWidth
              label={label}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              placeholder={placeholder}
              {...field}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : type === "date" ? (
            <div className="mb-4">
              <Typography
                component="label"
                sx={{
                  display: "block",
                  marginBottom: 1,
                  fontWeight: 500,
                }}
              >
                {label}
                <>{required && <span style={{ color: "#ff0000" }}> *</span>}</>
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label={label}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      required,
                      placeholder: "DD/MM/YYYY",
                      fullWidth: true,
                    },
                  }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(
                      date ? dayjs(date).format("YYYY-MM-DD") : null
                    )
                  }
                />
              </LocalizationProvider>
            </div>
          ) : (
            <div className="mb-4">
              <Typography
                component="label"
                sx={{
                  display: "block",
                  marginBottom: 1,
                  fontWeight: 500,
                }}
              >
                {label}
                <>{required && <span style={{ color: "#ff0000" }}> *</span>}</>
              </Typography>
              <StyledTextField
                fullWidth
                type={type}
                required={required}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                variant="outlined"
                size="small"
                placeholder={placeholder}
              />
            </div>
          )}
        </>
      )}
    />
  );
};

export default CustomFormField;
