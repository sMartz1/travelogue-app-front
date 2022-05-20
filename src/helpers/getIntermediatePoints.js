import axios from "axios";
import { Auth } from 'aws-amplify';
    
const getIntermediatePoints = async (id) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
    const response = await axios.get(`${process.env.REACT_APP_HOST_DB}api/secured/places/itineraryplaces/${id}`, 
    { headers: {"Authorization" : `${token.jwtToken}`} });
  return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default getIntermediatePoints;