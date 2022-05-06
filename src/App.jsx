import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import ProfileInfo from "./components/ProfileInfo"
import ForgottenPassword from "./components/ForgottenPassword";
import ChangePassword from "./components/ChangePassword";
import ListItems from "./components/ListItems"
import Footer from "./components/Footer";
import Header from "./components/Header"
import Landpage from "./components/LandPage";
function App() {
  return (<>s
    <Header />
    <main className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/forgottenpassword" element={<ForgottenPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/lists" element={<ListItems />} />
        </Routes>
      </BrowserRouter>
    </main> 
    <Footer /> 
    </>
  );
}

export default App;
