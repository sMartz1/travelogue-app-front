import React from 'react';
import { Controller } from "react-hook-form";
import {
  InputLabel,
  FormControl,
  Select
} from "@mui/material";
export default function SelectCustom({ name, control, label, id, children }) {
  return (
    <FormControl
      classname="form--input-select" >
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        classname="form--input-select"
        control={control}
        /* defaultValue={"es"} */
        defaultValue={""}
        render={({ field }) => (
          <Select {...field} label={label}>
            {children}
          </Select>
        )}
      />
    </FormControl>
  )
}
