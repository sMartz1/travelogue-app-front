import React, { useContext, useEffect, useState } from "react";
import {
  SettingsRounded,
  AddCircleRounded,
  DeleteRounded,
  NavigationSharp
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import deleteItinerary from '../../../helpers/deleteItinerary';
import deletePlace from '../../../helpers/deletePlace';
import { UserItinerariesContext } from '../../ListItems';


export default function Lists(elements) {
  const navigate = useNavigate();
  const [arrayPlaces, setArrayPlaces, arrayItineraries, setArrayItineraries] = useContext(UserItinerariesContext);

  const viewItem = (id, type) => {
    type === "Itineraries" ? navigate(`/itinerary/${id}`) : navigate(`/place/${id}`)
  }

  const modifyItem = (i) => {

    let itineraryToModify = arrayItineraries[i]
    window.localStorage.setItem('places', JSON.stringify(arrayPlaces));
    window.localStorage.setItem('itinerary', JSON.stringify(itineraryToModify));
    navigate(`/modifyItinerary/${itineraryToModify.id}`)

  }


  const deleteItem = (id) => {
    elements.title === 'Itineraries' ? deleteItinerary(id) : deletePlace(id);
    if (elements.title === 'Itineraries') {
      deleteItinerary(id)
      const filter = arrayItineraries.filter(e => e.id !== id)
      window.localStorage.setItem('itinerary', JSON.stringify(filter));
      setArrayItineraries(filter);
    } else {
      deletePlace(id)
      const filter = arrayPlaces.filter(e => e.id !== id)
      window.localStorage.setItem('itinerary', JSON.stringify(filter));
      setArrayPlaces(filter);
    }
  }

  useEffect(() => {
  }, [])

  useEffect(() => {

  }, [arrayPlaces, arrayItineraries])


  return (
    <div className="list--container">
      <div className="list--title"><h2>{elements.title}</h2><div className="list--button" onClick={() => navigate(`${elements.path}`)}><AddCircleRounded className="list--icon-add" /></div></div>
      {elements.elements.length > 0 ? <section className="profileinfo--list">
        {elements.elements.map((element, index) => {
          return (
            <div className="list--row" key={index}>
              <img className="list--img-cover" src={element.image_path || element[0]?.pathImage} />
              <div className="list--name-container">

                <p className="list--name" onClick={() => viewItem(element.id, elements.title)}>{element.name}</p>
              </div>
              <div className="list--buttons">
                {elements.title === 'Places' ? null : <div className="list--button" onClick={() => modifyItem(index)}><SettingsRounded /></div>}
                <div className="list--button" onClick={() => deleteItem(element.id)}><DeleteRounded /></div>
              </div>
            </div>)
        })}
      </section> : <h3>{`No ${elements.title} Yet`}</h3>}
    </div>
  );

}