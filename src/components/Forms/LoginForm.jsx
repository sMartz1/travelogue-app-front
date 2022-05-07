import React,{ useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate , NavLink } from 'react-router-dom';
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from '../../App';
import { Auth } from 'aws-amplify';

//Temporary mocked data
const textContent = {
  loginForm: {
    username: "Nombre de usuario",
    password: "Contraseña",
    forgottenPassword: "He olvidado la contraseña",
    buttonLogin: "Login",
    noaccount: "No tengo cuenta"
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
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();


  const {
    control: controlLogin,
    handleSubmit,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function signIn(data) {//si la contraseña es erronea devuelve un 400
    try {
      const response = await Auth.signIn(data.username, data.password);
      setUser({...response.attributes}) //setting UserContext with user data
      navigate(`/profile`)   //rendering ProfileInfo page
    } catch (error) {
        console.log(error);
    }
  }

  const onSubmit = (data) => {
    signIn(data);
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
      <NavLink className='aux-links' to ={`/forgottenpassword`}>{textContent.loginForm.forgottenPassword}</NavLink>
      <Button variant="contained" type="submit">
        {textContent.loginForm.buttonLogin}
      </Button>
      <NavLink className='aux-links' to ={`/register`}>{textContent.loginForm.noaccount}</NavLink>
    </form>
  </>
  );
}
