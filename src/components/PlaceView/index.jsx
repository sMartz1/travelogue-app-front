import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../Map";

export default function PlaceView(){
    const {id} = useParams()
    const [place,setPlace] = useState(null)
    const [coordinates,setCoordinates] = useState(null)
    console.log(place)

    const getPlace = async () => {
    let coordinatesArr = []    
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}places/singlePlace/${id}`)
    console.log(data)
    setPlace(data)
    const arrNumbers = data.location.split(",");
    coordinatesArr.push({
        ...data,
        coordinates: [
          parseFloat(parseFloat(arrNumbers[0]).toFixed(2)),
          parseFloat(parseFloat(arrNumbers[1]).toFixed(2)),
        ],
      });
      setCoordinates(coordinatesArr)
    }

    

    useEffect(()=> {
        getPlace()
    },[])
    console.log('place',place);
    return <div className="place--container">
        {place ? 
            <>
<<<<<<< HEAD
                <img className="place--image" src={place.image_path} width='70px' height='70px' alt={place.name}/>
                <div className="place-header">
                    <h1>{place.name}/{place.price}$</h1>
                </div>
                <div className="place-map-container">
                    <Map features={coordinates}  search={false} />
                </div>
                
=======
                <img className="place--image" src={place[0].pathImage} width='70px' height='70px' alt={place.name}/>
                <h1>{place.name}</h1>
                <h2>{place.location}</h2>
                <p>{place.price}</p> 
>>>>>>> a25bc9e1b535e15bda5112593dd28a526a8c4071
            </>
            : null}
        
    </div>
}
