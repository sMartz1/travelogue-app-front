import React, { useContext , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { UserContext } from '../../App';
import { Auth } from 'aws-amplify';




//Temporary mocked data
const textContent = {
  fieldsnames:["Username","Zona","Language","First Name","Last Name","Email","Rol"],
  title:"User Info",
  button:"Modify",
};
export default function Profileinfo() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const valuesdata = Object.values(user);
  async function iscurrentSession() {
    try {
      await Auth.currentSession();
    //checks there's a valid user logged and redirect to landing page in case we logout on this page.
    } catch (error) {
        navigate(`/`)
    }
  }
  useEffect(() => {
      iscurrentSession();
      console.log(user)
  }, [user])
  


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