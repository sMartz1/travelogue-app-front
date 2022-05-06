import { Auth } from 'aws-amplify';


const Header = () => {
    const title = "Travelogue App"
    const navLinks = ["Home", "Login", "Features"]
   /*  const loggedUserJSON = window.localStorage.getItem('userlogged'); */
    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return(
        <header className="header--main">
            <div className="header--title">
                <h1 onClick={signOut}>{title}</h1>
            </div>
            <nav className="header--navlinks">
                <ul>
                    {navLinks.map((element, index) => {
                        return <li className="header--link" key={index}>{element}</li>
                    })}
                </ul>
            </nav>
        </header>
    )

}

export default Header