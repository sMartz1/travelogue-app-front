import React from "react";
import { Button } from "@mui/material";
import Lists from "./Lists"


//Temporary mocked data
const itineraries = [{name:"uno",start:"punto inicial",end:"punto final"},
    {name:"uno",start:"punto inicial",end:"punto final"},
    {name:"uno",start:"punto inicial",end:"punto final"},
    {name:"uno",start:"punto inicial",end:"punto final"} ]
;
const places = [{name:"uno",location:"uno"},
    {name:"uno",location:"uno"},
    {name:"uno",location:"uno"},
    {name:"uno",location:"uno"} 
];
const textContent = {
  fieldsnames:["Username","First Name","Last Name","Email","Rol","Language"],
  titles:["Itineraries", "Places"],
  button:"back"
};
export default function ListItems() {
  
 
  return (
    <div className="list--main--container">
        <Lists elements={itineraries} title={textContent.titles[0]}/>
        <Lists elements={places} title={textContent.titles[1]}/>
        <Button variant="contained" type="submit">
          {textContent.button}
        </Button>
    </div>
  );
}