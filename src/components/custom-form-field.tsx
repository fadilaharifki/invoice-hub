import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  InputLabel,
  Autocomplete,
  IconButton,
  SxProps,
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
import { InputProps as MuiInputProps } from "@mui/material/Input";
import clsx from "clsx";
import { ExpandMoreRounded } from "@mui/icons-material";
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
  InputProps?: MuiInputProps;
  className?: string;
  sx?: SxProps;
  showClearButton?: boolean;
  labelOutside?: boolean;
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
  InputProps,
  className,
  sx,
  showClearButton = true,
  labelOutside = true,
}: CustomFormFieldProps<T>) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div
            className={clsx(
              "flex flex-col flex-1",
              !fieldState.error ? "mb-6" : "mb-0"
            )}
          >
            {labelOutside && (
              <InputLabel sx={{ fontWeight: 500, marginBottom: 0.5 }}>
                {label}
                {required && <span style={{ color: "#ff0000" }}> *</span>}
              </InputLabel>
            )}

            {type === "currency" ? (
              <NumericFormat
                {...field}
                className={clsx("", className)}
                customInput={TextField}
                thousandSeparator=","
                decimalSeparator="."
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder={placeholder}
                size={size}
                sx={{ ...sx }}
                InputProps={{
                  style: { background: "#F0F0F0" },
                  startAdornment: (
                    <InputAdornment position="start">{prefix}</InputAdornment>
                  ),
                  inputProps: {
                    style: { background: "white", paddingLeft: 10 },
                  },
                  endAdornment:
                    showClearButton && field.value ? (
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
                  ...InputProps,
                }}
                onValueChange={(values) => field.onChange(values.value)}
              />
            ) : type === "select" ? (
              <Autocomplete
                {...field}
                fullWidth
                value={
                  options.find((option) => option.value === field.value) || null
                }
                options={options}
                popupIcon={<ExpandMoreRounded />}
                onChange={(_, value) => {
                  if (Array.isArray(value)) return;

                  const val = value?.value;
                  field.onChange(val ?? undefined);
                }}
                isOptionEqualToValue={(option, value) => {
                  if (!value || Array.isArray(value)) return false;
                  return option.value === value.value;
                }}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option?.label || ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      className={clsx("", className)}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      placeholder={placeholder}
                      size={size}
                      sx={{ ...sx }}
                    />
                  );
                }}
              />
            ) : type === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  className={clsx("", className)}
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  disableOpenPicker
                  format="DD/MM/YYYY"
                  sx={{ ...sx }}
                  slotProps={{
                    textField: {
                      placeholder: "DD/MM/YYYY",
                      fullWidth: true,
                      size: "small",
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                      inputProps: { readOnly: true },
                      onClick: () => setOpen(true),
                      InputProps: {
                        endAdornment:
                          showClearButton && field.value ? (
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
                        ...InputProps,
                      },
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
            ) : (
              <TextField
                className={clsx("", className)}
                fullWidth
                type={type}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ ...sx }}
                {...field}
                variant="outlined"
                size={size}
                placeholder={placeholder}
                InputProps={{
                  endAdornment:
                    showClearButton && field.value ? (
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
                  ...InputProps,
                }}
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default CustomFormField;
