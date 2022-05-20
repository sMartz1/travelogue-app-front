import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getPlaceById = async (id) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}secured/places/id/${id}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
  return response.data[0]
  }
  catch(err) {
    console.log(err)
  }
}

export default getPlaceById;