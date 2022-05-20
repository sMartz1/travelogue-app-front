import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function PlaceView(){
    const {id} = useParams()
    const [place,setPlace] = useState(null)

    const getPlace = async () => {
        const {data} = await axios.get(`http://localhost:3003/api/places/singlePlace/${id}`)
        console.log(data)
        setPlace(data)
    }

    useEffect(()=> {
        getPlace()
    },[])

    return <div className="place--container">
        {place ? 
            <>
                <img className="place--image" src={place.image_path} width='70px' height='70px' alt={place.name}/>
                <h1>{place.name}</h1>
                <h2>{place.location}</h2>
                <p>{place.price}</p> 
            </>
            : null}
        
    </div>
}