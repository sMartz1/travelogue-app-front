import { useState, forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/userContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const textContent = {
  navLink: [
    { title: "Home", link: "/" },
    { title: "Discover", link: "/register" },
    { title: "Login", link: "/login" },
  ],
  title: "TRAVELOGUE",
  profile: "Profile",
  logout: "Logout",
};

const Header = () => {
  const blackHeaderPaths = ["/"];
  const location = useLocation();
  const [isBlack, setIsBlack] = useState(
    blackHeaderPaths.includes(location.pathname)
  );
  const { user, signOut } = useAuth();
  const [isUser, setIsUser] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
     setIsBlack(blackHeaderPaths.includes(location.pathname));
  }, [location]);

  useEffect(() => {
    setIsUser(user && Object.keys(user).length > 0 ? true : false);
    
  }, [user]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSignOut = () => {
    signOut();
    navigate("/");
    setIsUser(false);
    setOpen(true);
  };
  const handleLogged = () => {
    navigate("/profile");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const textColorClass = !isBlack ? "header--main black-text" : "header--main"
  const userButton = isUser ? (
    <div className={"header--menu--item"}>
      <div className="header--menu--item--user" onClick={handleLogged}>
        {user.name}
      </div>
      <div className="header--menu--item--logout" onClick={handleSignOut}>
        <LogoutIcon />
      </div>
    </div>
  ) : (
    <>
      <div className="header--menu--item" onClick={handleLogin}>
        <AccountCircleIcon /> Login
      </div>
    </>
  );
  console.log(textColorClass);
  return (
    <header className={textColorClass}>
      <div className="header--title" onClick={() => navigate("/")}>
        <h1 onClick={signOut}>{textContent.title}</h1>
      </div>
      <div className="header--menu">
        <div
          className="header--menu--item"
          onClick={() => navigate("/discover")}
        >
          Discover
        </div>
        {userButton}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Te has desconectado de tu cuenta.
        </Alert>
      </Snackbar>
    </header>
   
  );
};

export default Header;
