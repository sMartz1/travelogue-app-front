import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getUserPlaces = async (user) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {//url last parameter is userid, now it's one of mocked data, we can pass it through function parameters
    const response = await axios.get(`http://localhost:3003/api/secured/places/all/f9badfe9-f0fb-49f8-a8af-144f32d47bde`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
 
  return response.data.own
  }
  catch(err) {
    console.log(err)
  }
}

export default getUserPlaces;