import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function PlaceView(){
    const {id} = useParams()
    const [place,setPlace] = useState(null)

    const getPlace = async () => {

        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}places/singlePlace/${id}`)
        setPlace(data)
    }

    useEffect(()=> {
        getPlace()
    },[])
    console.log('place',place);
    return <div className="place--container">
        {place ? 
            <>
                <img className="place--image" src={place[0].pathImage} width='70px' height='70px' alt={place.name}/>
                <h1>{place.name}</h1>
                <h2>{place.location}</h2>
                <p>{place.price}</p> 
            </>
            : null}
        
    </div>
}