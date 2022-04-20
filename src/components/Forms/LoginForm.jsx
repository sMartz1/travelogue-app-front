import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TextField
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//Temporary mocked data
const textContent = {
  loginForm: {
    username: "Nombre de usuario",
    password: "Contraseña",
    buttonLogin: "Login",
  },
  validations: {
    minChar: (n, fieldForm) =>
      `El ${fieldForm} debe tener un minimo de ${n} caracteres`,
  },
};

//Definition of schame validation
const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, textContent.validations.minChar(3, textContent.loginForm.username))
    .required(),
  password: yup
    .string()
    .min(5, textContent.validations.minChar(5, textContent.loginForm.password))
    .required(),
});

export default function LoginForm() {
  const {
    control: controlLogin,
    handleSubmit,
    formState: { errors: errorsLogin },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
      console.log("Datos recolectados",data)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={controlLogin}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="login-input"
            label={textContent.loginForm.username}
            variant="standard"
            error={!!errorsLogin.username}
            helperText={errorsLogin.username ? errorsLogin.username?.message : ""}
          />
        )}
      />
      <Controller
        name="password"
        control={controlLogin}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="password-input"
            label="Contraseña"
            variant="standard"
            type="password"
            error={!!errorsLogin.password}
            helperText={
              errorsLogin.password ? errorsLogin.password?.message : ""
            }
          />
        )}
      />
      <Button variant="contained" type="submit">
        {textContent.loginForm.buttonLogin}
      </Button>
    </form>
  );
}
