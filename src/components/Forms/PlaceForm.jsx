import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FileCustom from "./SubComponents/FileCustom"
import { useEffect, useState } from "react";


/* A constant that contains the text that will be displayed in the form. */
const textContent = {
  placeForm: {
    name: "Name of the place",
    price:"Estimated Price",
    buttonPlace: "Create Place",
  },
  validations: {
    minChar: (n, fieldForm) =>
      `El ${fieldForm} debe tener un minimo de ${n} caracteres`,

  },
};


const schema = yup.object().shape({
  name: yup
    .string()
    .min(5, textContent.validations.minChar(5, textContent.placeForm.name))
    .required(),
    price:yup
    .number()
    

});

const imgSize = "50px"

export default function PlaceForm() {
  const [file, setFile] = useState(null)
  const [previewImg,setPreviewImg] = useState(null)

  const {
    control: controlPlace,
    handleSubmit,
    formState: { errors: errorsPlace },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log("Datos recolectados", data,file);
  };

  useEffect(()=> {
    if(file){
      const img = URL.createObjectURL(file)
      console.log(img)
      setPreviewImg(img)
    }
  },[file])



  return <><form onSubmit={handleSubmit(onSubmit)}>
    <TextFieldCustom name="name"
      control={controlPlace}
      label={textContent.placeForm.name}
      id="place-input"
      errors={errorsPlace.name} />
    {previewImg ? <img width={imgSize} height={imgSize} src={previewImg} alt='img not found'/> : null}
    <FileCustom
      setFile={setFile}
    />
    <TextFieldCustom name="price"
    control={controlPlace}
    label={textContent.placeForm.price}
    id="place-price"
    errors={errorsPlace.price}/>
    <Button variant="contained" type="submit">
      {textContent.placeForm.buttonPlace}
    </Button>
  </form>

  </>
}