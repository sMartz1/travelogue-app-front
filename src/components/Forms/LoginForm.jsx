import React from "react";
import { useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
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
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("Datos recolectados", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldCustom
        name="username"
        control={controlLogin}
        label={textContent.loginForm.username}
        id="login-input"
        errors={errorsLogin.username}
      />
      <TextFieldCustom
        name="password"
        control={controlLogin}
        label={textContent.loginForm.password}
        id="password-input"
        errors={errorsLogin.password}
        type="password"
      />
      <Button variant="contained" type="submit">
        {textContent.loginForm.buttonLogin}
      </Button>
    </form>
  );
}
