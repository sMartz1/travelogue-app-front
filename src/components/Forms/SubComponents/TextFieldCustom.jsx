import React from 'react'
import { Controller } from "react-hook-form";
import {
    TextField,InputAdornment
  } from "@mui/material";
export default function TextFieldCustom({name,control,label,id,errors,type,adornment,position}) {
  return (
    <Controller
        name={name}
        control={control}
        /* defaultValue="" */
        render={({ field }) => (
          <TextField
            {...field}
            id={id}
            label={label}
            variant="standard"
            error={!!errors}
            type={type?type:"text"}
            helperText={errors ? errors?.message : ""}
            InputProps={adornment ? {startAdornment: <InputAdornment position={position}>{adornment}</InputAdornment>,} : null}
          />
        )} 
      />
  )
}
