import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getUserItineraries = async (user) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
    const response = await axios.get(`http://localhost:3003/api/secured/itineraries/all/${user}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
  return response.data.own
  }
  catch(err) {
    console.log(err)
  }
}

export default getUserItineraries;