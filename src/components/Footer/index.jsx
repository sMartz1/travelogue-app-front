import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PublicIcon from '@mui/icons-material/Public';

const textContent = {
    SocialMedia: [
        { link: 'Facebook', icon: FacebookRoundedIcon, name: 'Facebook' },
        { link: 'instagram', icon: InstagramIcon, name: 'Instagram' },
        { link: 'twiter', icon: TwitterIcon, name: 'Twitter' }
    ],
    /* Policy : [
        {name:'Terms of use',link:'tata'},
        {name:'Privacy policy',link:'tatata'},
        {name:'Cookies policy', link:'tatee'}

    ], */
    CompanyName: {
        logo: PublicIcon,
        name: 'Travelogue'
    },
    TimeOfCreation: '© 2022 Travelogue Company '
}

const imageSize = '35px'

export default function Footer() {

    return <footer className='footer--main'>
        <div className="footer--body-superior">
            {textContent.SocialMedia.map((e, i) => {
                return (
                    <div className='footer--social-container'>
                        <e.icon />
                        <a href={e.link}
                            className="footer--link"
                            target="_blank"
                            rel="noopener noreferrer">{e.name}</a>
                    </div>
                )
            })}
        </div>
        <div className='footer--body-inferior'>
            <div className="footer--container-bottom">
                <textContent.CompanyName.logo />
                <p className='footer--text'>{textContent.CompanyName.name}</p>
            </div>
            <div className="footer--container-bottom">
                <p className="footer-text">{textContent.TimeOfCreation}</p>
            </div>
        </div>
    </footer>

}