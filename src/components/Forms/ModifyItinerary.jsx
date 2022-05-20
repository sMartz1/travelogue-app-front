import React, { useState , useRef , useEffect } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { set, useForm } from "react-hook-form";
import TextFieldCustom from "./SubComponents/TextFieldCustom";
import SelectCustom from "./SubComponents/SelectCustom";
import { Button, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import modifyItinerary from '../../helpers/modifyItinerary';
import postItineraryPlaces from '../../helpers/postItineraryPlaces.js';
import getItineraryPlaces from '../../helpers/getItineraryPlaces.js';
import deleteItineraryPlaces from '../../helpers/deleteItineraryPlaces'
import {
  SettingsRounded,
  AddCircleRounded,
  DeleteRounded
} from "@mui/icons-material";
import { Auth } from 'aws-amplify';

const textContent = {
  registerForm: {
    itineraryName: "Nombre de itinerario",
    lastName: "Apellidos",
    buttonModify: "Modificar Itinerario",
    buttonBack:"Volver",
    start:"Start point",
    end:"End point",
    points:"Intermediate points",
    price:"Precio (opcional) "
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
  .notRequired()
    .default("   ")
    .min(
      3,
      textContent.validations.minChar(
        3,
        textContent.registerForm.itineraryName.toLowerCase()
      )
    ),

  price: yup
    .number()
    .nullable()
    .notRequired()
});

export default function ModifyItinerary() {
  
  const {id} = useParams();
  const [ addPoint, setAddPoint ] = useState(false);
  const [ points, setPoints ] = useState([]);
  const [ place, setPlace ] = useState();
  const [ itineraryData, setItineraryData ] = useState();
  const [ arrayPlaces, setArrayPlaces ] = useState([]);
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
  
  const handleNewPoint = ()=> { /* function to add a new intermediatePoint */
    const data = {place:place.name,id:place.id,time:time.current.value,date:date.current.value};
    points.push(data);
    setPoints([...points])
    setAddPoint(false)
  }
  
  const deletePoint = (i)=> {
    points.splice(i,1);
    setPoints([...points])
  }
  
  
  const onSubmit = async (data) => { /* function to send form */
    const dataToSave = {
        id:itineraryData.id,
        name: data.itineraryName==="   "? itineraryData.name : data.itineraryName,
        start_location: data.start? data.start : itineraryData.start_location,
        end_location: data.end? data.end : itineraryData.end_location,
        price: data.price? data.price : itineraryData.price,        
    };
    try {
      await modifyItinerary(dataToSave);
      reset({itineraryName:""})
      handlePoints(itineraryData.id) 
    }
    catch {

      setPoints([])
    }
  };

  const handlePoints = async (id) => {/*  FUNCTION TO ADD A NEW INTERMEDIATE POINT */
    let data = []; /* array to post itinerary places -----------------------------*/
    if (points.length) {
      try {
        await deleteItineraryPlaces(id)
      }
      catch(err) {
        console.log(err)
      }
      points.map((e)=>(
        data.push({
          id_itinerary:id,
          id_place: e.id,
          date_place: `${e.date} ${e.time}:00`
        })
        ))
        try {
          await postItineraryPlaces(data)
          setPoints([])
        }
        catch(err) {
          console.log(err)
        }
      }
      reset();
      navigate('/lists')
  }

  useEffect(() => {
  },[points])

  const handlePlaces = async (id) => { /*  function launched when charged */

      try {   
          const response = await getItineraryPlaces(id)
          let placesSavedJson= window.localStorage.getItem('places');  
          let placesSaved = JSON.parse(placesSavedJson);
          let itinerarySavedJson= window.localStorage.getItem('itinerary');  
          let itinerarySaved = JSON.parse(itinerarySavedJson);
          setItineraryData({...itinerarySaved})
          setArrayPlaces([...placesSaved])
          let auxArray = []
          response.map((e,index)=> {
            const placeData = placesSaved.filter(place=> place.id===e.id_place);
            let auxDate = e.date_place.slice(0,10) //place date
            let auxTime = e.date_place.slice(11,16) //place time
            auxArray.push({place:placeData[0].name, id:e.id_place, date:auxDate, time: auxTime})
          })
          setPoints([...auxArray])
      }
      catch (err) {console.log(err)
      }
      

  }
  
  useEffect( () => {
    handlePlaces(id)
  }, [])
  
  return (
    <>
     {arrayPlaces.length > 0 ? <form className="itineraries" onSubmit={handleSubmit(onSubmit)}>
        <TextFieldCustom
          name="itineraryName"
          control={controlRegister}
          label={itineraryData.name}
          id="itineraryName-register-form"
          errors={errorsRegister.itineraryName}
        />
        <SelectCustom
          name="start"
          control={controlRegister}
          label={`${textContent.registerForm.start}: ${itineraryData.start_location}`}

        >
          {arrayPlaces.map((e,index) => (
            <MenuItem key={`${e.id}start${index}`} value={e.name}>
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
                <p key={`${e.id}intermediate${index}`}>{`${e.place}, el día ${e.date} a las ${e.time}`}</p>
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
                  <MenuItem key={`${e.id}addnew${index}`} value={e.name} onClick={()=>setPlace({name:e.name,id:e.id})} >
                   {/*  saving place in state to push it to the intermediate points array */}
                   {/* we save name to show in form and id to save itineraryplace */}
                    {e.name}
                  </MenuItem>
                ))}
              </SelectCustom>
              <input type="time" ref={time}/>  
              <input type="date" ref={date}/> 
              <AddCircleRounded onClick={handleNewPoint} /> 
          </div>}
        </div>
        <SelectCustom
          name="end"
          control={controlRegister}
          label={`${textContent.registerForm.end}: ${itineraryData.end_location}`}
        >
          {arrayPlaces.map((e, index) => (
            <MenuItem key={`${e.id}end${index}`} value={e.name}>
              {e.name}
            </MenuItem>
          ))}
        </SelectCustom>
        <TextFieldCustom
          name="price"
          control={controlRegister}
          label={`${textContent.registerForm.price}: ${itineraryData.price}`}
          id="price-register-form"
          errors={errorsRegister.price}
        />           
        <Button variant="contained" type="submit">
          {textContent.registerForm.buttonModify}
        </Button>
        <Button variant="contained" type="button" onClick={()=>navigate('/lists')} >
          {textContent.registerForm.buttonBack}
        </Button>
      </form>: <h1>Charging...</h1>}
    </>
  );
}
