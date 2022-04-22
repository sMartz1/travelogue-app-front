import React from 'react';
import { Controller } from "react-hook-form";
import {
    InputLabel,
    FormControl,
    Select
  } from "@mui/material";
export default function SelectCustom({name,control,label,id,children}) {
  return (
    <FormControl sx={{ mt: "25px" }}>
        <InputLabel id={id}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={"es"}
          render={({ field }) => (
            <Select {...field} label={label}>
            {children}
            </Select>
          )}
        />
      </FormControl>
  )
}
