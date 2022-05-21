import { Carrousel } from "../Carrousel"
import { useState, useEffect } from 'react'
import { getRandoms } from "../../helpers/getRandoms"

const Discover = () => {
    let i = 0
    const [places, setPlaces] = useState([])
    const [itineraries, setItineraries] = useState([])

    useEffect(() => {
        call()
    }, [])

    const call = async () => {
        const response = await getRandoms();
        setPlaces(response[0])
        setItineraries(response[1])
        console.log(response)
    }

    return (
        <section className="discover--main">
            <div className="discover--slot">
                <Carrousel objects={places} type="place" />
            </div>
            <div className="discover--slot">
                <Carrousel objects={itineraries} type="itinerary" />
            </div>
        </section>
    )
}

export default Discover