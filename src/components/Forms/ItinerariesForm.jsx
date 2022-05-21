import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { set, useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import SelectCustom from "./SubComponents/SelectCustom";
import { Button, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getUserPlaces from '../../helpers/getUserPlaces';
import postNewItinerary from '../../helpers/postNewItinerary';
import postItineraryPlaces from '../../helpers/postItineraryPlaces.js';
import {
  SettingsRounded,
  AddCircleRounded,
  DeleteRounded
} from "@mui/icons-material";
import { Auth } from 'aws-amplify';

const textContent = {
  registerForm: {
    itineraryName: "Nombre de itinerario",
    description:"Descripción",
    lastName: "Apellidos",
    buttonCreate: "Crear Itinerario",
    start: "Start point",
    end: "End point",
    points: "Intermediate points",
    price: "Precio (opcional) "
  },

  validations: {
    minChar: (n, fieldForm) =>
      `El ${fieldForm} debe tener un minimo de ${n} caracteres`,
  }
};

//Definition of schame validation
const schema = yup.object().shape({
  itineraryName: yup
    .string()
    .default("")
    .min(
      3,
      textContent.validations.minChar(
        3,
        textContent.registerForm.itineraryName.toLowerCase()
      )
    )
    .required(),
  price: yup
    .number()
    .nullable()
    .default(0)
    .notRequired()
});

export default function ItinerariesForm() {

  const [addPoint, setAddPoint] = useState(false);
  const [points, setPoints] = useState([]);
  const [place, setPlace] = useState();
  const [arrayPlaces, setArrayPlaces] = useState([]);
  const time = useRef();
  const date = useRef();
  const navigate = useNavigate();
  const {
    control: controlRegister,
    handleSubmit,
    reset,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNewPoint = () => {
    const data = { place: place.name, id: place.id, time: time.current.value, date: date.current.value };
    points.push(data);
    setPoints([...points])
    setAddPoint(false)
  }

  const deletePoint = (i) => {
    points.splice(i, 1);
    setPoints([...points])
  }


  const onSubmit = async (data) => {

    const userdata = await Auth.currentUserInfo();
    const dataToSave = {
      id_user: userdata.username,
      name: data.itineraryName,
      description:data.description,
      start_location: data.start,
      end_location: data.end,
      price: data.price,
    };
    try {
      const itinerary = await postNewItinerary(dataToSave);

      reset({ itineraryName: "" })
      handlePoints(itinerary.id) /* we need itinerary id to save itinerary places */
    }
    catch {

      setPoints([])
    }
  };

  const handlePoints = async (id) => {
    let data = []; /* array to post itinerary places */
    if (points.length) {

      points.map((e) => (
        data.push({
          id_itinerary: id,
          id_place: e.id,
          date_place: `${e.date} ${e.time}:00`
        })
      ))


      try {
        await postItineraryPlaces(data)
        setPoints([])
      }
      catch (err) {
        console.log(err)
      }
    }
    console.log('antes del segundo reset')
    reset();
  }

  useEffect(() => {
  }, [points])


  const handlePlaces = async () => {

    try {
      const userdatas = await Auth.currentUserInfo();
      const res = await getUserPlaces(userdatas.username)
      setArrayPlaces([...res])
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {
    handlePlaces()
  }, [])

  console.log(arrayPlaces)
  return (
    <>
      {arrayPlaces.length > 0 ? <form className="itineraries form--main" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldCustom
          name="itineraryName"
          control={controlRegister}
          label={textContent.registerForm.itineraryName}
          id="itineraryName-register-form"
          errors={errorsRegister.itineraryName}
        />
        <TextFieldCustom
          name="description"
          control={controlRegister}
          label={textContent.registerForm.description}
          id="description-register-form"
          errors={errorsRegister.description}
        />
        <SelectCustom
          name="start"
          control={controlRegister}
          label={textContent.registerForm.start}
        >
          {arrayPlaces.map((e, index) => (
            <MenuItem key={e.id} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </SelectCustom>
        <div className="intermediate--points">
          <div className="intermediate--points--head">
            <p>Intermediate points</p>
            <SettingsRounded onClick={() => setAddPoint(!addPoint)} />
          </div>
          {points.map((e, index) =>
            <div className="intermediate--points--unit">
              <p key={`${e.date}${index}`}>{`${e.place}, el día ${e.date} a las ${e.time}`}</p>
              <DeleteRounded key={`${e.place}${index}`} value={index} onClick={() => deletePoint(index)} />
            </div>)}
          {/* modal to add intermediate point   */}
          {addPoint && <div className="points">
            <SelectCustom
              name="points"

              control={controlRegister}
              label={textContent.registerForm.points}
            >
              {arrayPlaces.map((e, index) => (
                <MenuItem key={e.index + e.id} value={e.name} onClick={() => setPlace({ name: e.name, id: e.id })} >
                  {/*  saving place in state to push it to the intermediate points array */}
                  {/* we save name to show in form and id to save itineraryplace */}
                  {e.name}
                </MenuItem>
              ))}
            </SelectCustom>
            <input type="time" ref={time} />
            <input type="date" ref={date} />
            <AddCircleRounded onClick={handleNewPoint} />
          </div>}
        </div>
        <SelectCustom
          name="end"
          control={controlRegister}
          label={textContent.registerForm.end}
        >
          {arrayPlaces.map((e, index) => (
            <MenuItem key={`${e.index}end${index}`} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </SelectCustom>
        <TextFieldCustom
          name="price"
          control={controlRegister}
          label={textContent.registerForm.price}
          id="price-register-form"
          errors={errorsRegister.price}
        />
        <Button variant="contained" type="submit" onClick={() => console.log('click')} >
          {textContent.registerForm.buttonCreate}
        </Button>
      </form> : <h1>Charging...</h1>}
    </>
  );
}
