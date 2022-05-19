import { useContext, useEffect } from 'react';
import TravelLand from '../../assets/scss/images/travelLand.png'
import Discover from '../../assets/scss/images/discover.png'
import Easy from '../../assets/scss/images/easy.png'
import Share from '../../assets/scss/images/share.png'
import { UserContext } from '../../App';
import { Auth } from 'aws-amplify';
import PlaceForm from '../Forms/PlaceForm';
import { useAuth } from '../Context/userContext';
import playaLandpage from '../../assets/scss/images/playa_landpage.jpg';



const textContent = {
    title: {
        slogan: 'The #1 Travel Page Platform for Spaniards.',
        imageUrl: TravelLand
    },
    perks: [
        { urlImage: Easy, perkTitle: 'Easy to Use', perkDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { urlImage: Discover, perkTitle: 'Detailed Itineraries', perkDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { urlImage: Share, perkTitle: 'Share New Gems', perkDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
    ]

}
const imageSize = '50px'

export default function Landpage() {
    const { user } = useAuth();

    return (
        <section className='landpage--main'>
            <img className='landpage--main-img' src={playaLandpage} alt="Barcos" />
            <div className='landpage--main-body'>

            </div>
        </section>
    )
}