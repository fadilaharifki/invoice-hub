import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  InputLabel,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import {
  ClearIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface CustomFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  type?: "text" | "number" | "date" | "currency" | "select";
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  prefix?: string;
  size?: "small" | "medium";
}

const CustomFormField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  type = "text",
  options = [],
  placeholder,
  prefix,
  size = "small",
}: CustomFormFieldProps<T>) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: "1rem" }}>
          <InputLabel sx={{ fontWeight: 500, marginBottom: 0.5 }}>
            {label}
            {required && <span style={{ color: "#ff0000" }}> *</span>}
          </InputLabel>

          {type === "currency" ? (
            <NumericFormat
              {...field}
              customInput={TextField}
              thousandSeparator=","
              decimalSeparator="."
              fullWidth
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              placeholder={placeholder}
              size={size}
              InputProps={{
                style: { background: "#F0F0F0" },
                startAdornment: (
                  <InputAdornment position="start">{prefix}</InputAdornment>
                ),
                inputProps: {
                  style: { background: "white", paddingLeft: 10 },
                },
                endAdornment: field.value ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => field.onChange("")}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              onValueChange={(values) => field.onChange(values.value)}
            />
          ) : type === "select" ? (
            <Autocomplete
              {...field}
              options={options}
              onChange={(_, value) => field.onChange(value)}
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.label || ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder={placeholder}
                  size={size}
                />
              )}
            />
          ) : type === "date" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                disableOpenPicker
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    required,
                    placeholder: "DD/MM/YYYY",
                    fullWidth: true,
                    size: "small",
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    inputProps: { readOnly: true },
                    onClick: () => setOpen(true),
                    InputProps: {
                      endAdornment: field.value ? (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => field.onChange(null)}
                            edge="end"
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    },
                  },
                }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? dayjs(date).format("YYYY-MM-DD") : null)
                }
              />
            </LocalizationProvider>
          ) : (
            <TextField
              fullWidth
              type={type}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
              variant="outlined"
              size={size}
              placeholder={placeholder}
              InputProps={{
                endAdornment: field.value ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => field.onChange("")}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          )}
        </div>
      )}
    />
  );
};

export default CustomFormField;
