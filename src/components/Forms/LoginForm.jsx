import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { useAuth } from "../Context/userContext";

//Temporary mocked data
const textContent = {
  loginForm: {
    username: "Nombre de usuario",
    password: "Contraseña",
    forgottenPassword: "He olvidado la contraseña",
    buttonLogin: "Login",
  },
  validations: {
    validEmail: "Introduce un email valido",
    minChar: (n, fieldForm) =>
      `El ${fieldForm} debe tener un minimo de ${n} caracteres`,
  },
};

//Definition of schame validation
const schema = yup.object().shape({
  username: yup
    .string()
    .email(textContent.validations.validEmail)
    .required(textContent.validations.reqEmail),
  password: yup
    .string()
    .min(5, textContent.validations.minChar(5, textContent.loginForm.password))
    .required(),
});

export default function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    control: controlLogin,
    handleSubmit,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const sign = await signIn(data);
    if (sign) navigate('/');
  };

  const forgotPassword = (data) => {
    navigate("/forgottenpassword");
  };
  return (
    <>
      <form className="form--main" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldCustom
          name="username"
          className="form--input-text"
          control={controlLogin}
          label={textContent.loginForm.username}
          id="login-input"
          errors={errorsLogin.username}
        />
        <TextFieldCustom
          name="password"
          className="form--input-text"
          control={controlLogin}
          label={textContent.loginForm.password}
          id="password-input"
          errors={errorsLogin.password}
          type="password"
        />
        <p className="forgotten--password-link" onClick={forgotPassword}>
          {textContent.loginForm.forgottenPassword}
        </p>
        <Button className="form--button-submit" variant="contained" type="submit">
          {textContent.loginForm.buttonLogin}
        </Button>
      </form>
    </>
  );
}
