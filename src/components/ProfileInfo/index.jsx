import React, { useContext , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { UserContext } from '../../App';
import { useAuth } from "../Context/userContext";



//Temporary mocked data
const textContent = {
  fieldsnames:["Username","Zona","Language","First Name","Last Name","Email","Rol"],
  title:"User Info",
  button:"Modify",
};
export default function Profileinfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
    const valuesdata = Object.values(user);




  return user? (
    <div className="profileinfo--container">
      <h2>{textContent.title}</h2>    
      <ul className="profileinfo--list">
        {valuesdata.map((element, index)=> <li key={index}><div>{textContent.fieldsnames[index]}</div><div>{element}</div></li>)}
        
      </ul>
      <Button variant="contained" type="submit">
        {textContent.button}
      </Button>
    </div>
  ):'Loading';
}