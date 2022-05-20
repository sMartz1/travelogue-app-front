import { useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./index.scss";
import PlaceForm from "../Forms/PlaceForm";
import { useAuth } from "../Context/userContext";

const textContent = {
  title: {
    slogan: "Explore your favourite journey!",
    subSlogan: "Let’s make our life a life",
  },
};

export default function Landpage() {
  return (
    <>
      <main className="landpage--main--container">
        <header>
          <div className="landpage--main--header--image"></div>
          <div className="landpage--main--header--slogan">
            {textContent.title.slogan}
            <div>{textContent.title.subSlogan}</div>
          </div>
        </header>
        <section className="landpage--body">
          <article className="popular-itineraries carrousel-container">
            <div className="title-landpage-carousel">Popular itineraries</div>
            <div className="carousel-landpage"> Carousel1</div>
          </article>
          <article className="popular-places carrousel-container">
            <div className="title-landpage-carousel">Popular Places</div>
            <div className="carousel-landpage"> Carousel2</div>

          </article>
        </section>
      </main>
    </>
  );
}
