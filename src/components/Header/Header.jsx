
import { Auth } from 'aws-amplify';
const Header = () => {

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
    const title = "Travelogue App"
    const navLinks = ["Home", "Login", "Features"]

    return(
        <header className="header--main">
            <div className="header--title">
                <h1>{title}</h1>
            </div>
            <nav className="header--navlinks">
                <ul>
                    <li onClick={signOut}>Sign Out</li>
                    {navLinks.map((element, index) => {
                        return <li className="header--link" key={index}>{element}</li>
                    })}
                </ul>
            </nav>
        </header>
    )

}

export default Header