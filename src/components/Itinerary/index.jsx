import React, { useState, useEffect } from "react";
import Map from '../Map';
import './styles.scss'

export default function Itinerary({  }) {
  const [itineratyData, setItineratyData] = useState({id:'0395c2d3-b042-40e1-b1f2-6cd057d56927',name:'Account Chips parse',description:"Viaje por las llanuras de tal hasta cual etc etc",start_location:[39.6163,59.7745],end_location:[-76.1340,111.6725],price:240,created_at:new Date()});

  useEffect(() => {}, []);

  return (
    <div className="itinerary-container">
      <div className="itinerary-header">{itineratyData.name}</div>
      <div className="itinerary-description">{itineratyData.description}</div>
      <div className="itinerary-map">
        <div className="itinerary-place-list">
          <div className="place-list-item">1</div>
          <div className="place-list-item">2</div>
          <div className="place-list-item">3</div>
          <div className="place-list-item">4</div>
        </div>
        <div className="itinerary-map-container"><Map search={false}/></div>
      </div>
    </div>
  );
}
