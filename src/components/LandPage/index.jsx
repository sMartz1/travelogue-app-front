import { useState, useEffect } from "react";
import { getRandoms } from "../../helpers/getRandoms";
import { Carrousel } from "../Carrousel";

const textContent = {
  title: {
    slogan: "Explore your favourite journey!",
    subSlogan: "Let’s make our life a life",
  },
};

export default function Landpage() {
  const [carrousel1, setCarrousel1] = useState([])
  const [carrousel2, setCarrousel2] = useState([])

  useEffect(() => {
    call();
  }, [])

  useEffect(() => {

  }, [carrousel1, carrousel2])

  const call = async () => {
    const response = await getRandoms();
    setCarrousel1(response[0]);
    setCarrousel2(response[1]);
  }

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
            <div className="carousel-landpage">
              {carrousel2.length > 0 ? <Carrousel objects={carrousel2} type='itinerary' /> : null}
            </div>
          </article>
          <article className="popular-places carrousel-container">
            <div className="title-landpage-carousel">Popular Places</div>
            <div className="carousel-landpage">
              {carrousel1.length > 0 ? <Carrousel objects={carrousel1} type='place' /> : null}
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
