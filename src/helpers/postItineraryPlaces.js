import axios from "axios";
import { Auth } from 'aws-amplify';

const postNewPlace = async (body) => {
  const userdata = await Auth.currentSession();
  const token = userdata.getAccessToken();
  try {
      const response = await axios.post(`http://localhost:3003/api/secured/places/itineraryplaces`, body,
      { headers: {"Authorization" : `${token.jwtToken}`} });
    return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default postNewPlace;