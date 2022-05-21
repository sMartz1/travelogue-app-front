import TextFieldCustom from "./SubComponents/TextFieldCustom";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FileCustom from "./SubComponents/FileCustom"
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App';
import { uploadFile } from 'react-s3';
import { config } from "../config/config-s3"
import axios from 'axios'
import { Auth } from "aws-amplify";
import Map from '../Map'
import { useAuth } from "../Context/userContext";

window.Buffer = window.Buffer || require("buffer").Buffer;

/* A constant that contains the text that will be displayed in the form. */
const textContent = {
  placeForm: {
    name: "Name of the place",
    price: "Estimated Price",
    location: "location",
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
  const { user } = useAuth();
  const [file, setFile] = useState(null)
  const [previewImg,setPreviewImg] = useState(null)
  const [urlS3,setUrlS3] = useState('');
  const navigate = useNavigate();
  const [marker, setMarker] = useState(null)
  

  const {
    control: controlPlace,
    handleSubmit,
    formState: { errors: errorsPlace },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function iscurrentSession() {
    try {
      await Auth.currentSession();
    //checks there's a valid user logged and redirect to landing page in case we logout on this page.
    } catch (error) {
        navigate(`/login`)
    }
  }
  useEffect(() => {
    iscurrentSession();
  }, []);

  const onSubmit = async (data_form) => {
    await
      uploadFile(file, config)
        .then(data => setUrlS3(data.location))
        .catch(err => console.error(err))
      const userdata = await Auth.currentSession()
      const token = userdata.getAccessToken()
    const t = await 
      axios.post(`${process.env.REACT_APP_API_URL}secured/places/createPlace`,{
        name:data_form.name,
        price : data_form.price,
        location : `${marker.geometry.coordinates[0]},${marker.geometry.coordinates[1]}`,
        path_image: urlS3,
        id_user:user.sub
    },{ headers : {"Authorization" : `${token.jwtToken}`}})  
    navigate('/profile')
  };

  useEffect(() => {
    if (file) {
      const img = URL.createObjectURL(file)
      setPreviewImg(img)
    }
  }, [file])


  return <><form className="place--form" onSubmit={handleSubmit(onSubmit)}>
    {previewImg ? <img width={imgSize} height={imgSize} src={previewImg} alt='img not found' /> : null}
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
    <div className="map-container-create-place">
    <Map setMarker={setMarker}/>
    </div>
    {/* <TextFieldCustom name="location"
    control = {controlPlace}
    label={textContent.placeForm.location}
    id="place-location"
    errors={errorsPlace.location}/> */}
    <Button variant="contained" type="submit">
      {textContent.placeForm.buttonPlace}
    </Button>
  </form>

  </>
}