import React, { useContext , useEffect , useState } from "react";
import {
  SettingsRounded,
  AddCircleRounded,
  DeleteRounded,
  NavigationSharp
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import deleteItinerary from '../../../helpers/deleteItinerary';
import deletePlace from '../../../helpers/deletePlace';
import {UserItinerariesContext} from '../../ListItems';
import './styles.scss'


export default function Lists(elements) {
    const navigate = useNavigate();
    const[arrayPlaces, setArrayPlaces, arrayItineraries, setArrayItineraries] = useContext(UserItinerariesContext);
    const viewItem = (id)=> {
      elements.title === 'Itineraries'? navigate(`/itinerary/${id}`) : navigate(`/place/${id}`)
    }
    
    const modifyItem = (i)=> {
      let itineraryToModify = arrayItineraries[i]
      window.localStorage.setItem('places',JSON.stringify(arrayPlaces));  
      window.localStorage.setItem('itinerary',JSON.stringify(itineraryToModify));  
      navigate(`/modifyItinerary/${itineraryToModify.id}`)
    }

    const deleteItem = (id)=> {
      elements.title==='Itineraries'? deleteItinerary(id): deletePlace(id);
    }

    useEffect( () => {
    }, [])
    return (
      <div className="list--container">
        <div className="list--title"><h2>{elements.title}</h2><div className="list--button" onClick={()=> navigate(`${elements.path}`)}><AddCircleRounded/></div></div>  
        <ul className="profileinfo--list">
          {elements.elements.map((element, index)=> <li key={index}><div className="list--button" onClick={()=>viewItem(element.id)}>{element.name}</div>
          <div className="list--button" onClick={()=>modifyItem(index)}><SettingsRounded/></div>
          <div className="list--button" onClick={()=>deleteItem(element.id)}><DeleteRounded/></div></li> )}
        </ul>
      </div>
    );
}