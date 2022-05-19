import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext , useState } from 'react'
import Login from "./components/Login"
import Register from "./components/Register";
import ProfileInfo from "./components/ProfileInfo"
import ForgottenPassword from "./components/ForgottenPassword";
import ChangePassword from "./components/ChangePassword";
import ListItems from "./components/ListItems"
import Footer from "./components/Footer";
import Header from "./components/Header/Header"
import Landpage from "./components/LandPage";
import ItinerariesForm from "./components/Forms/ItinerariesForm";
import PlaceView from "./components/PlaceView";
import { CreatePlaceView } from "./components/createPlaceView";

export const UserContext = createContext(null);

function App() {
  const [ user , setUser ] = useState({})
  return (<>
    <UserContext.Provider value={[user,setUser]}>
      <main className="main-container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Landpage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileInfo />} />
            <Route path="/forgottenpassword" element={<ForgottenPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/lists" element={<ListItems />} />
            <Route path="/createitinerary" element={<ItinerariesForm />} />
            <Route path="/place/:id" element={<PlaceView />} />
            <Route path='createPlace' element={<CreatePlaceView/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
      <Footer /> 
    </UserContext.Provider>
    </>
  );
}

export default App;
