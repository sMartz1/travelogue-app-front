import axios from "axios";
import { Auth } from 'aws-amplify';
    
const deleteItineraryPlaces = async (itineraryId) => {
  const usertoken = await Auth.currentSession();
  const token = usertoken.getAccessToken();
  try {
    const response = axios({
        method: 'delete',
        url: `http://localhost:3003/api/secured/places/deleteitineraryplaces`,
        data: {id_itinerary:itineraryId},
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

export default deleteItineraryPlaces;