import React, { useContext } from "react";
import { Button } from "@mui/material";
import { UserContext } from '../../App';



//Temporary mocked data
const usermock = {
    username: "x",
    firstname: "Juan",
    lastname: "Palomo",
    email:"miemail@gmail.com",
    rol:"user",
    language:"spanish"
};
const textContent = {
  fieldsnames:["Username","First Name","Last Name","Email","Rol","Language"],
  title:"User Info",
  button:"Modify",
};
export default function Profileinfo() {
  const [user, setUser] = useContext(UserContext);
  const valuesdata = Object.values(user);
  console.log(valuesdata);
  console.log(user)
 
  return (
    <div className="profileinfo--container">
      <h2>{textContent.title}</h2>    
      <ul className="profileinfo--list">
        {valuesdata.map((element, index)=> <li key={index}><div>{textContent.fieldsnames[index]}</div><div>{element}</div></li>)}
        
      </ul>
      <Button variant="contained" type="submit">
        {textContent.button}
      </Button>
    </div>
  );
}