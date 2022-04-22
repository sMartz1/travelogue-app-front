import React from "react";
import { useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import SelectCustom from "./SubComponents/SelectCustom";
import { Button, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const textContent = {
  registerForm: {
    firstName: "Nombre",
    lastName: "Apellidos",
    password: "Contraseña",
    confirmPassword: "Repite la contraseña",
    email: "Correo electronico",
    buttonCreate: "Registrarse",
    language: "Lenguaje",
  },
  arrayLanguages: [
    {
      label: "Español",
      value: "es",
    },
    { label: "Ingles", value: "en" },
  ],
  validations: {
    minChar: (n, fieldForm) =>
      `El ${fieldForm} debe tener un minimo de ${n} caracteres`,
    validEmail: "Introduce un email valido",
    reqEmail: "Es necesario un email",
    confirmPassword: "Las contraseñas deben coincidir",
    reqPassword: "Es necesaria una contraseña",
  },
};

//Definition of schame validation
const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(
      3,
      textContent.validations.minChar(
        3,
        textContent.registerForm.firstName.toLowerCase()
      )
    )
    .required(),
  lastName: yup
    .string()
    .min(
      3,
      textContent.validations.minChar(
        3,
        textContent.registerForm.lastName.toLowerCase()
      )
    ),
  password: yup.string().required(textContent.validations.reqPassword),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      textContent.validations.confirmPassword
    ),
  email: yup
    .string()
    .email(textContent.validations.validEmail)
    .required(textContent.validations.reqEmail),
});

export default function RegisterForm() {
  const {
    control: controlRegister,
    handleSubmit,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Datos recolectados", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldCustom
        name="firstName"
        control={controlRegister}
        label={textContent.registerForm.firstName}
        id="firstname-register-form"
        errors={errorsRegister.firstName}
      />
      <TextFieldCustom
        name="lastName"
        control={controlRegister}
        label={textContent.registerForm.lastName}
        id="lastname-register-form"
        errors={errorsRegister.lastName}
      />
      <TextFieldCustom
        name="password"
        control={controlRegister}
        label={textContent.registerForm.password}
        id="password-input-register-form"
        errors={errorsRegister.password}
        type="password"
      />
      <TextFieldCustom
        name="confirmPassword"
        control={controlRegister}
        label={textContent.registerForm.confirmPassword}
        id="password-repeat-input-register-form"
        errors={errorsRegister.confirmPassword}
        type="password"
      />
      <TextFieldCustom
        name="email"
        control={controlRegister}
        label={textContent.registerForm.email}
        id="email-input-register-form"
        errors={errorsRegister.email}
        type="email"
      />
      <SelectCustom
        name="language"
        control={controlRegister}
        label={textContent.registerForm.language}
      >
        {textContent.arrayLanguages.map((e) => (
          <MenuItem key={e.value} value={e.value}>
            {e.label}
          </MenuItem>
        ))}
      </SelectCustom>

      <Button variant="contained" type="submit">
        {textContent.registerForm.buttonCreate}
      </Button>
    </form>
  );
}
