import axios from "axios";
import { Auth } from 'aws-amplify';

const deletePlace = async (place_id) => {
  const usertoken = await Auth.currentSession();
  const token = usertoken.getAccessToken();
  try {
    const response = axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}secured/places/deleteplace`,
      data: { id: place_id },
      headers: {
        Authorization: `${token.jwtToken}`
      }
    })
    return response.data
  }

  catch (err) {
    console.log(err)
  }
}

export default deletePlace;