import { useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./index.scss";
import PlaceForm from "../Forms/PlaceForm";
import { useAuth } from "../Context/userContext";

const textContent = {
  title: {
    slogan: "Explore your favourite journey!",
    subSlogan:"Let’s make our life a life"
    
  },
};

export default function Landpage() {
 
  return (
    <>
      <main className="landpage--main--container">
        <header>
          <div className="landpage--main--header--image">
          </div>
          <div className="landpage--main--header--slogan">
              {textContent.title.slogan}
              <div>{textContent.title.subSlogan}</div>
            </div>
        </header>
      </main>
    </>
  );
}
