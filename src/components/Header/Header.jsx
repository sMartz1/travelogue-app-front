import { useContext , useEffect } from 'react';
import { UserContext } from '../../App';
import { Auth } from 'aws-amplify';

const textContent = {
    navLink: {
        logged: ["Home","Profile","Logout"]
        ,
        nologged: ["Home","Register","Login"]
    },
    title: "Travelogue App",
  };

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    const title = "Travelogue App"
    const navLinks = ["Home", "Login", "Features"]
    async function signOut() {
        try {
            const response = await Auth.signOut();
            setUser({})
            console.log('logout')
            console.log(response)
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    console.log(user);
    return(
        <header className="header--main">
            <div className="header--title">
                <h1 onClick={signOut}>{title}</h1>
            </div>
            <nav className="header--navlinks">
                <ul>
                    {user.email? textContent.navLink.logged.map((element, index) => {
                        return <li className="header--link" key={index}>{element}</li>
                    }):
                    textContent.navLink.nologged.map((element, index) => {
                        return <li className="header--link" key={index}>{element}</li>
                    })}
                </ul>
            </nav>
        </header>
    )

}

export default Header