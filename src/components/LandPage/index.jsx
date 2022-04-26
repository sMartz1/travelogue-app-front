import TravelLand from '../../assets/scss/images/travelLand.png'
import Discover from '../../assets/scss/images/discover.png'
import Easy from '../../assets/scss/images/easy.png'
import Share from '../../assets/scss/images/share.png'
import "./index.scss"


const textContent = {
    title: {
        slogan:'The #1 Travel Page Platform for Spaniards.',
        imageUrl: TravelLand
    },
    perks : [
        {urlImage:Easy,perkTitle:'Easy to Use',perkDescription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {urlImage:Discover,perkTitle:'Detailed Itineraries',perkDescription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {urlImage:Share,perkTitle:'Share New Gems',perkDescription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
    ]

}
const imageSize = '50px'

export default function Landpage(){

    return <><section> 
        <h1>{textContent.title.slogan}</h1>
        <img width='300px' height='300px' src={textContent.title.imageUrl} alt=''/>
    </section>
    <div className='perks'>
        {textContent.perks.map((e,i)=> 
            <div key={i} className='single-perk'>
                <img width={imageSize} height={imageSize} src={e.urlImage} alt=''/>
                <h2>{e.perkTitle}</h2>
                <p>{e.perkDescription}</p>
            </div>)}
    </div>
     
    </>
}