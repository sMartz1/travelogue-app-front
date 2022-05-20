import React, { useState, useEffect, createContext } from "react";
import { Button } from "@mui/material";
import Lists from "./Lists"
import { Auth } from 'aws-amplify';
import getUserItineraries from '../../helpers/getUserItineraries';
import getUserPlaces from '../../helpers/getUserPlaces';
import { useAuth } from "../Context/userContext";

export const UserItinerariesContext = createContext(null);

const textContent = {
  fieldsnames: ["Username", "First Name", "Last Name", "Email", "Rol", "Language"],
  titles: ["Itineraries", "Places"],
  button: "back"
};
export default function ListItems() {
  const { user } = useAuth();
  const [arrayItineraries, setArrayItineraries] = useState([]);
  const [arrayPlaces, setArrayPlaces] = useState([]);

  const handleItems = async () => {
    const userdatas = await Auth.currentUserInfo();
    try {
      const res = await getUserItineraries(userdatas.username)
      setArrayItineraries([...res])
    } catch (err) { console.log(err) }

    try {
      const res = await getUserPlaces(userdatas.username)
      setArrayPlaces([...res])
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    handleItems()
  }, [])

  return (<>
    {arrayPlaces.length > 0 ?
      <UserItinerariesContext.Provider value={[arrayPlaces, setArrayPlaces, arrayItineraries, setArrayItineraries]}>
        <div className="list--main--container">
          <Lists elements={arrayItineraries} title={textContent.titles[0]} path={'/createItinerary'} />
          <Lists elements={arrayPlaces} title={textContent.titles[1]} path={''} />
        </div>
        <div className="list--container-button-submit">
          <Button className="list--button-submit" variant="contained" type="submit">
            {textContent.button}
          </Button>
        </div>
      </ UserItinerariesContext.Provider> : <h1>charging...</h1>}
  </>);
}