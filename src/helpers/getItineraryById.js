import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getItineraryById = async (id) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}secured/itineraries/itinerary/${id}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
    return response.data[0]
  }
  catch(err) {
    console.log(err)
  }
}

export default getItineraryById;