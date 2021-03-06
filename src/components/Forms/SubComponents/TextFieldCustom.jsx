import React from 'react'
import { Controller } from "react-hook-form";
import {
  TextField, InputAdornment
} from "@mui/material";
export default function TextFieldCustom({ name, control, label, id, errors, type, adornment, position,defaultValue }) {
  return (
    <Controller
      name={name}
      control={control}
       defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          label={label}
          className="form--input-text"
          variant="standard"
          error={!!errors}
          type={type ? type : "text"}
          helperText={errors ? errors?.message : ""}
          InputProps={adornment ? { startAdornment: <InputAdornment position={position}>{adornment}</InputAdornment>, } : null}
        />
      )}
    />
  )
}
