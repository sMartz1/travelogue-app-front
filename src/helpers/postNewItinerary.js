import axios from "axios";
import { Auth } from 'aws-amplify';
    
const postNewItinerary = async (body) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}secured/itineraries/newitinerary`, body,
    { headers: {"Authorization" : `${token.jwtToken}`} });
    return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default postNewItinerary;

