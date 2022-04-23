import React from "react";
import {
  SettingsRounded,
  AddCircleRounded,
  DeleteRounded
} from "@mui/icons-material";

//Temporary mocked data
const user = {
    username: "x",
    firstname: "Juan",
    lastname: "Palomo",
    email:"miemail@gmail.com",
    rol:"user",
    language:"spanish"
};

export default function Lists(elements) {
    console.log(elements)
    const list = Object.values(elements.elements)

    const viewItem = ()=> {
      console.log('peticion')
    }
    
    const modifyItem = ()=> {
      console.log('peticion')
    }

    const deleteItem = ()=> {
      console.log('peticion')
    }

    const addItem = ()=> {
      console.log('peticion')
    }

    return (
      <div className="list--container">
        <div className="list--title"><h2>{elements.title}</h2><div onClick={addItem}><AddCircleRounded/></div></div>  
        <ul className="profileinfo--list">
          {list.map((element, index)=> <li key={index}><div onClick={viewItem}>{element.name}</div>
          <div onClick={modifyItem}><SettingsRounded/></div>
          <div onClick={deleteItem}><DeleteRounded/></div></li> )}
        </ul>
      </div>
    );
}