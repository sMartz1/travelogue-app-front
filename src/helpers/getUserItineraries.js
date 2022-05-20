import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getUserItineraries = async (user) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {

    const response = await axios.get(`${process.env.REACT_APP_HOST_DB}api/secured/itineraries/all/${user}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
  return response.data.own
  }
  catch(err) {
    console.log(err)
  }
}

export default getUserItineraries;