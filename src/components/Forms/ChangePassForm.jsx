import { useNavigate } from 'react-router-dom';
import { set, useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from 'aws-amplify';


const textContent = {
  changeForm: {
    password: "Nueva Contraseña",
    confirmPassword: "Repite la contraseña",
    confirmationcode: "Código de confirmación",
    email: "Correo electronico",
    buttonChange: "Cambiar contraseña",
  },
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
  confirmationcode: yup
    .string()
    .min(
      4,
      textContent.validations.minChar(
        4,
        textContent.changeForm.confirmationcode.toLowerCase()
      )
    )
    .required(),
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

export default function ChangePassForm() {

  const navigate = useNavigate();
  //function to change password
  async function forgotPasswordSubmit(datas) {
    try {
      await Auth.forgotPasswordSubmit(datas.email,datas.confirmationcode, datas.password);
      console.log('password updated sucessfully');
      navigate('/login')
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  const {
    control: controlChange,
    handleSubmit,
    formState: { errors: errorsChange },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {
    forgotPasswordSubmit(data);
  };

  return (
    <>
     <form onSubmit={handleSubmit(onSubmit)}>
        <p className="recover--form--info">Hemos enviado un códido de confirmación a tu correo electrónico</p>
        <TextFieldCustom
          name="email"
          control={controlChange}
          label={textContent.changeForm.email}
          id="email-input-register-form"
          errors={errorsChange.email}
          type="email"
        />        
        <TextFieldCustom
          name="confirmationcode"
          control={controlChange}
          label={textContent.changeForm.confirmationcode}
          id="confirmationcode-register-form"
          errors={errorsChange.confirmationcode}
        />
        <TextFieldCustom
          name="password"
          control={controlChange}
          label={textContent.changeForm.password}
          id="password-input-register-form"
          errors={errorsChange.password}
          type="password"
        />
        <TextFieldCustom
          name="confirmPassword"
          control={controlChange}
          label={textContent.changeForm.confirmPassword}
          id="password-repeat-input-register-form"
          errors={errorsChange.confirmPassword}
          type="password"
        />

        <Button variant="contained" type="submit">
          {textContent.changeForm.buttonChange}
        </Button>
      </form>
    </>
  );
}
