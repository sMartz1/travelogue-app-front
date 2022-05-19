import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FileCustom from "./SubComponents/FileCustom"
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App';
import { uploadFile } from 'react-s3';
import {config} from "../config/config-s3"
import axios from 'axios'
import { Auth } from "aws-amplify";

window.Buffer = window.Buffer || require("buffer").Buffer; 

/* A constant that contains the text that will be displayed in the form. */
const textContent = {
  placeForm: {
    name: "Name of the place",
    price:"Estimated Price",
    location:"location",
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
    .number(),
  location : yup
    .string()
    .required('location is required')
    

});

const imgSize = "50px"

export default function PlaceForm() { 
  const [user, setUser] = useContext(UserContext);
  const [file, setFile] = useState(null)
  const [previewImg,setPreviewImg] = useState(null)
  const [urlS3,setUrlS3] = useState('')
  

  
  const {
    control: controlPlace,
    handleSubmit,
    formState: { errors: errorsPlace },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data_form) => {
    await 
      uploadFile(file, config)
        .then(data => setUrlS3(data.location))
        .catch(err => console.error(err))
      const userdata = await Auth.currentSession()
      const token = userdata.getAccessToken()
    await 
      axios.post('http://localhost:3003/api/secured/places/createPlace',{
        name:data_form.name,
        price : data_form.price,
        location : data_form.location,
        path_image: urlS3,
        id_user:user.sub
    },{ headers : {"Authorization" : `${token.jwtToken}`}})  

  };

  useEffect(()=> {
    if(file){
      const img = URL.createObjectURL(file)
      setPreviewImg(img)
    }
  },[file])



  return <><form className="place--form" onSubmit={handleSubmit(onSubmit)}>
     {previewImg ? <img width={imgSize} height={imgSize} src={previewImg} alt='img not found'/> : null}
     <FileCustom
      setFile={setFile}
    /> 
    <TextFieldCustom name="name"
      control={controlPlace}
      label={textContent.placeForm.name}
      id="place-input"
      errors={errorsPlace.name} />
    <TextFieldCustom name="price"
    control={controlPlace}
    label={textContent.placeForm.price}
    id="place-price"
    errors={errorsPlace.price}
    adornment={'$'}
    position={'start'}/>
    <TextFieldCustom name="location"
    control = {controlPlace}
    label={textContent.placeForm.location}
    id="place-location"
    errors={errorsPlace.location}/>
    <Button variant="contained" type="submit">
      {textContent.placeForm.buttonPlace}
    </Button>
  </form>

  </>
}