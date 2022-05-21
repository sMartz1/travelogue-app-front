import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getUserPlaces = async (user) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  console.log(user)
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}secured/places/all/${user}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
  return response.data.own
  }
  catch(err) {
    console.log(err)
  }
}

export default getUserPlaces;