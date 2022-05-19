import axios from "axios";
import { Auth } from 'aws-amplify';
    
const deleteItinerary = async (place_id) => {
  const usertoken = await Auth.currentSession();
  const token = usertoken.getAccessToken();
  try {
    const response = axios({
        method: 'delete', 
        url: `http://localhost:3003/api/secured/itineraries/deletePlace`,
        data: {id:place_id},
        headers: {
            Authorization : `${token.jwtToken}`
        }
      })
  return response.data
  }

  catch(err) {
    console.log(err)
  }
}

export default deleteItinerary;