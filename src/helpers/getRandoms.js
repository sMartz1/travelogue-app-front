import axios from "axios"

export const getRandoms = async () => {
    try {
        const responsePlaces = await axios.get(`${process.env.REACT_APP_API_URL}random/places`)
        const responseItineraries = await axios.get(`${process.env.REACT_APP_API_URL}random/itineraries`)
        return [responsePlaces.data, responseItineraries.data]
    } catch (error) {
        return [[], []]
    }
}