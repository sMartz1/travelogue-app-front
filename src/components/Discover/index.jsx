import { Carrousel } from "../Carrousel"
import { useState, useEffect } from 'react'
import { callToApi } from "./helper"

const Discover = () => {
    let i = 0
    const [places, setPlaces] = useState([])
    const [itineraries, setItineraries] = useState([])

    useEffect(() => {
        call()
    }, [])

    const call = async () => {
        const response = await callToApi();
        setPlaces(response[0])
        setItineraries(response[1])
        console.log(response)
    }

    return (
        <section className="discover--main">
            <div className="discover--slot">
                <Carrousel objects={places} />
            </div>
            <div className="discover--slot">
                <Carrousel objects={itineraries} />
            </div>
        </section>
    )
}

export default Discover