import React, { useState } from "react";
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
  recoverForm: {
    email: "Email",
    buttonRecover: "Recuperar contraseña",
  },
  validations: {
    validEmail: "Introduce un email valido",
    reqEmail: "Es necesario un email",
    minChar: (n, fieldForm) =>
      `El ${fieldForm} debe tener un minimo de ${n} caracteres`,
  },
};

//Definition of schame validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email(textContent.validations.validEmail)
    .required(textContent.validations.reqEmail),
});

export default function RecoverForm() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const {
    control: controlRecover,
    handleSubmit,
    formState: { errors: errorsRecover },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //function to send confirmation code to change password
  async function forgotPassword(user) {
    try {
      await Auth.forgotPassword(user);
      navigate('/changepassword')
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  const onSubmit = (data) => {
    forgotPassword(data.email)
  };

  return (<>
    <form className="form--main" onSubmit={handleSubmit(onSubmit)}>
      <TextFieldCustom
        name="email"
        control={controlRecover}
        label={textContent.recoverForm.email}
        id="email-recover-input"
        errors={errorsRecover.email}
      />
      <Button variant="contained" type="submit">
        {textContent.recoverForm.buttonRecover}
      </Button>
    </form>
  </>
  );
}