import mapboxgl from "mapbox-gl";
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import SearchBar from "./subcomponents/SearchBar";
import Marker from "./subcomponents/Marker"
mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

export default function Map({features,changePlace,search = true}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isSearchBox, setIsSearchBox] = useState(search);
  const [lng, setLng] = useState(-3.70);
  const [lat, setLat] = useState(40.41);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    
    if(changePlace){
        const moveMap = i =>{
            map.current.flyTo({ center:[features[i].coordinates[0],features[i].coordinates[1]],zoom:15 });
          }
          changePlace.current = moveMap;
    }
    

    if(features?.length > 0){
      const bounds = [];
      let indexMarker = 1;
      features.forEach(feature=>{
          // Create a React ref
          const ref = React.createRef();
           // Create a new DOM node and save it to the React ref
           ref.current = document.createElement('div');
           const root = createRoot(ref.current);
           root.render(
            <Marker onClick={markerClicked} feature={feature} >{indexMarker}</Marker>,
            
          );
          indexMarker++
          // Create a Mapbox Marker at our new DOM node
          new mapboxgl.Marker(ref.current)
            .setLngLat(feature.coordinates)
            .addTo(map.current);
  
            bounds.push(feature.coordinates);
      }) 

      var boundsF = bounds.reduce(function(boundsIn, coord) {
        return boundsIn.extend(coord);
      }, new mapboxgl.LngLatBounds(bounds[0], bounds[0]));
      map.current.fitBounds(boundsF,{
        padding: 20
        });
    }
  });
  //Update state
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  
  });

 
  const markerClicked = e=>{
    console.log(e)

  }

  return (
    <div ref={mapContainer} className="map-container">
      {isSearchBox?<SearchBar map={map} />:""}
    </div>
  );
}
