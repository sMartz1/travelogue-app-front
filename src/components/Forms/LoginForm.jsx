import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

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
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 6d8ab48d62f62ef11a91948774383eafb5daa28c

  const {
    control: controlLogin,
    handleSubmit,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function signIn(data) {//si la contraseña es erronea devuelve un 400
    try {
      await Auth.signIn(data.username, data.password);
      navigate(`/profile`)   
    } catch (error) {
        console.log(error);
    }
  }

  const onSubmit = (data) => {
    signIn(data);
  };

  const forgotPassword = (data) => {
    navigate('/forgottenpassword')
  };
  return (<>
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
      <p className="forgotten--password-link" onClick={forgotPassword}>{textContent.loginForm.forgottenPassword}</p>
      <Button variant="contained" type="submit">
        {textContent.loginForm.buttonLogin}
      </Button>
    </form>
  </>
  );
}
