import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { set, useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import SelectCustom from "./SubComponents/SelectCustom";
import { Button, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  SettingsRounded,
  AddCircleRounded,
  DeleteRounded
} from "@mui/icons-material";



const textContent = {
  registerForm: {
    itineraryName: "Nombre de itinerario",
    lastName: "Apellidos",
    buttonCreate: "Crear Itinerario",
    start:"Start point",
    end:"End point",
    points:"Intermediate points"
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
    .min(
      3,
      textContent.validations.minChar(
        3,
        textContent.registerForm.itineraryName.toLowerCase()
      )
    )
    .required(),

});

export default function ItinerariesForm() {

  const [ addPoint, setAddPoint ] = useState(false);
  const [ points, setPoints ] = useState([]);
  const [ place, setPlace ] = useState();
  const [ arrayPlaces, setArrayPlaces ] = useState([]);
  const time = useRef();
  const date = useRef();
  const navigate = useNavigate();

  const {
    control: controlRegister,
    handleSubmit,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const handlePoint = ()=> {
    const data = {place:place,time:time.current.value,date:date.current.value};
    points.push(data);
    setAddPoint(false)
  }
  
  const deletePoint = (i)=> {
    /* setPoints(points.splice(i,1)) */
    setAddPoint(true)
    points.splice(i,1);
    setAddPoint(false)
  }
  
  
  const onSubmit = (data) => {
    setPoints([])
  };

  useEffect(() => {
  },[addPoint])

  useEffect(() => {
    const getPlaces = async () => {
      try {
              const response = await axios.get(`http://localhost:3003/api/places/all/f9badfe9-f0fb-49f8-a8af-144f32d47bde`);
      setArrayPlaces([...response.data.own])
      return response.data.own
      }
      catch(err) {
        console.log(err)
      }

    }
    const dataplaces = getPlaces()
    console.log(dataplaces)
  }, [])

  return (
    <>
     {arrayPlaces.length > 0 ? <form className="itineraries" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldCustom
          name="itineraryName"
          control={controlRegister}
          label={textContent.registerForm.itineraryName}
          id="itineraryName-register-form"
          errors={errorsRegister.itineraryName}
        />
        <SelectCustom
          name="start"
          control={controlRegister}
          label={textContent.registerForm.start}
        >
          {arrayPlaces.map((e,index) => (
            <MenuItem key={e.id} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </SelectCustom>
        <div className="intermediate--points">
            <div className="intermediate--points--head">
                <p>Intermediate points</p>            
                <SettingsRounded onClick={()=>setAddPoint(!addPoint)} />
            </div> 
            {points.map((e,index)=> 
              <div className="intermediate--points--unit">
                <p key={`${e.date}${index}`}>{`${e.place}, el día ${e.date} a las ${e.time}`}</p>
                <DeleteRounded key={`${e.place}${index}`} value={index} onClick={()=>deletePoint(index)} />
              </div>)}

          {/* modal to add intermediate point   */}
          {addPoint && <div className="points">
              <SelectCustom
                name="points"
                
                control={controlRegister}
                label={textContent.registerForm.points}
              >
                {arrayPlaces.map((e,index) => (
                  <MenuItem key={e.index} value={e.name} onClick={()=>setPlace(e.name)} >
                   {/*  saving place in state to push it to the intermediate points array */}
                    {e.name}
                  </MenuItem>
                ))}
              </SelectCustom>
              <input type="time" ref={time}/>  
              <input type="date" ref={date}/> 
              <AddCircleRounded onClick={handlePoint} /> 
          </div>}
        </div>
        <SelectCustom
          name="end"
          control={controlRegister}
          label={textContent.registerForm.end}
        >
          {arrayPlaces.map((e, index) => (
            <MenuItem key={e.index} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </SelectCustom>

        <Button variant="contained" type="submit" onClick={()=>console.log('click')} >
          {textContent.registerForm.buttonCreate}
        </Button>
      </form>: <h1>Charging...</h1>}
    </>
  );
}
