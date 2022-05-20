import axios from "axios"

export const callToApi = async () => {
    try {
        const responsePlaces = await axios.get(`${process.env.REACT_APP_HOST_DB}random/places`)
        const responseItineraries = await axios.get(`${process.env.REACT_APP_HOST_DB}random/places`)
        return [responsePlaces.data, responseItineraries.data]
    } catch (error) {
        return [[], []]
    }
}