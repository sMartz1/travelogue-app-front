import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getItineraryPlaces = async (id) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}secured/places/places/${id}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
  return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default getItineraryPlaces;