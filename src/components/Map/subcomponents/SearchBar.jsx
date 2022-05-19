import React, { useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

export default function SearchBar({ map }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const getUrl = (str) =>
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${str.replace(
      " ",
      "%20"
    )}.json?proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=${
      process.env.REACT_APP_MAP_TOKEN
    }`;

    const getAddress = e =>`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lng},${e.lat}.json?language=es&access_token=${
      process.env.REACT_APP_MAP_TOKEN
    }`;

  const handleOnChangeSearch = async (e) => {
    setSearch(e.target.value);
    const data = await axios.get(getUrl(e.target.value));

    setResults(data.data.features);
  };

    const dragEnd = async (e)=>{
      console.log(e);
      const data = await axios.get(getAddress(e.target._lngLat))
      setSearch(data.data.features[0].place_name)
      console.log(data.data.features);
      
    }


    //Gestionamos el movimiento del mapa desde esta funcion, esta se le facilita a SearchBar
    const changeMap = (element) => {
      if (!map.current) return; // wait for map to initialize
      map.current.flyTo({ center: element.center,zoom:15 });
      new mapboxgl.Marker({
         draggable:true
       })
      .setLngLat(element.center).on('dragend',dragEnd)
      .addTo(map.current);
    };

  return (
    <div className="search-box">
      <input
        type="text"
        onChange={handleOnChangeSearch}
        value={search}
        placeholder="Buscar..."
      />
      {results.length > 0 ? <div className="result-list">
        {results.map((element) => (
          <div
            className="result"
            key={element.id}
            onClick={() => {
              changeMap(element);
              setSearch("");
              setResults([]);
            }}
          >
            {element.place_name_es}
          </div>
        ))}
      </div> : ""}
      
    </div>
  );
}
