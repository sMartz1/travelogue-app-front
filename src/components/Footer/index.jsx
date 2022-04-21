import facebookLogo from '../../assets/scss/images/facebook.png'
import InstagramLogo from '../../assets/scss/images/instagram.png'
import TwitterLogo from '../../assets/scss/images/twitter.png'
import "./index.scss";

const textContent = {
    SocialMedia : [
        {link:'Facebook',urlImage:facebookLogo,name:'Facebook'},
        {link:'instagram', urlImage:InstagramLogo,name:'Instagram'},
        {link:'twiter',urlImage:TwitterLogo,name:'Twitter'}
    ],
    /* Policy : [
        {name:'Terms of use',link:'tata'},
        {name:'Privacy policy',link:'tatata'},
        {name:'Cookies policy', link:'tatee'}

    ], */
    CompanyName: {
        logo:'tarara',
        name:'Travelogue'
    },
    TimeOfCreation : '© 2022 Travelogue Company '        
}

const imageSize = '35px'

export default function Footer() {

    return <footer>
        <div className="socialMedia">
            {textContent.SocialMedia.map((e,i)=><img width={imageSize} height={imageSize} key={i} alt={e.name} src={e.urlImage}/>)}
        </div>
        {/* <div className="policies">
            {textContent.Policy.map((e,i)=> <h3 key={i}>{e.name}</h3>)}
        </div> */}
        <div className="CompanyName">
            <img src={textContent.CompanyName.logo} alt='Logo'/>
            <h3>{textContent.CompanyName.name}</h3>
        </div>
        <div className="timeOfCreation">
            {textContent.TimeOfCreation}
        </div>
    </footer>

}