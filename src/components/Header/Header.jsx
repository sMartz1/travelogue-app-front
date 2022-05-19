import { useContext , useState } from 'react';
import { UserContext } from '../../App';
import { Link , NavLink , useNavigate} from "react-router-dom";
import { useAuth } from '../Context/userContext';

/* const textContent = {
    navLink: {
        logged: ["Home","Profile","Logout"]
        ,
        nologged: ["Home","Register","Login"]
    },
    title: "Travelogue App",
  }; */
const textContent = {
    navLink:  [{title:"Home", link:"/"},{title:"Discover", link:"/register"},{title:"Login", link:"/login"}],
    title: "Travelogue App",
    profile:"Profile",
    logout:"Logout"
    };
  

const Header = () => {
    const {user,signOut} = useAuth();
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    
    const handleSignOut = ()=>{
        signOut();
        handleModal();
        navigate('/')
    }
    const handleModal = ()=> {
        setModal(!modal)
    }
    return(
        <header className="header--main">
            <div className="header--title">
                <h1 onClick={signOut}>{textContent.title}</h1>
            </div>
            <nav className="header--navlinks">
                <ul>
                    {textContent.navLink.map((element, index) => {
                        return <li className="header--link" key={index}>
                                    {index == 2 && user?.email ? <div><p onClick={handleModal} className="header--link">
                                        {user.name}
                                    </p> </div>: 
                                    <NavLink to={element.link} className="header--link">
                                        {element.title}
                                    </NavLink>}
                                    {/* <NavLink to={element.link} className="header--link">
                                        {index == 2 && user.email ? user.name : element.title}
                                    </NavLink> */}
                                </li>
                    })}
                </ul>
                {modal && 
                    <div className="header--modal">
                        <ul>
                            <li><p onClick={handleModal}>x</p></li>
                            <li><NavLink to="/profile">{textContent.profile}</NavLink></li>
                            <li><p onClick={signOut}>{textContent.logout}</p></li>
                        </ul>
                    </div>}
            </nav>
        </header>
    )

}

export default Header