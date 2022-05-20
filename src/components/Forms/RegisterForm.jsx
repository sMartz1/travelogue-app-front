import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { set, useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import SelectCustom from "./SubComponents/SelectCustom";
import { Button, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from 'aws-amplify';


const textContent = {
  registerForm: {
    firstName: "Nombre",
    lastName: "Apellidos",
    password: "Contraseña",
    confirmPassword: "Repite la contraseña",
    email: "Correo electronico",
    buttonCreate: "Registrarse",
    buttonConfirm: "Enviar código",
    language: "Lenguaje",
    confirmationCode: "Introduce código confirmación"
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

  const [confirmView, setConfirmView] = useState(false);
  const [confirmUser, setConfirmUser] = useState('');
  const confirmationCode = useRef();
  const navigate = useNavigate();

  //function to send confirmation code
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(confirmUser, confirmationCode.current.value);
      navigate(`/login`)
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  // function to register user
  async function signUp(newuser) {
    try {
      await Auth.signUp({
        username: newuser.email,
        password: newuser.password,
        attributes: {
          family_name: newuser.lastName,
          name: newuser.firstName,
          'custom:language': newuser.language,
          zoneinfo: newuser.language
        }
      });
      setConfirmView(true); //open modal to send confirmation code
      setConfirmUser(newuser.email) //saving user email to confirm user
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  const {
    control: controlRegister,
    handleSubmit,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {
    signUp(data);
  };

  return (
    <>
      {confirmView ?
        <div className='form--main' >
          <div className="form--confirmation">
            <input
              type="text"
              placeholder={textContent.registerForm.confirmationCode}
              ref={confirmationCode}
              id="confirmationcode-input-register-form"
            />
            <Button variant="contained" type="button" onClick={confirmSignUp}>
              {textContent.registerForm.buttonConfirm}
            </Button>
          </div>
        </div> : <form className='form--main' onSubmit={handleSubmit(onSubmit)}>
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
        </form>}
    </>
  );
}
