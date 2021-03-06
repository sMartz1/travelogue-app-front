import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from 'react'
import Login from "./components/Login"
import Register from "./components/Register";
import ProfileInfo from "./components/ProfileInfo"
import ForgottenPassword from "./components/ForgottenPassword";
import ChangePassword from "./components/ChangePassword";
import ListItems from "./components/ListItems"
import Footer from "./components/Footer";
import Header from "./components/Header"
import Landpage from "./components/LandPage";
import Discover from "./components/Discover"
import ItinerariesForm from "./components/Forms/ItinerariesForm";
import ModifyItinerary from "./components/Forms/ModifyItinerary";
import { Auth } from 'aws-amplify';
import Itinerary from "./components/Itinerary";
import PlaceView from "./components/PlaceView";
import { CreatePlaceView } from "./components/createPlaceView";
import { AuthProvider,useAuth } from "./components/Context/userContext";


export const UserContext = createContext(null);

function App() {


  const {user,loading} = useAuth();
  if(!loading){return (<>
    
      <main className="main-container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Landpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileInfo />} />
            <Route path="/forgottenpassword" element={<ForgottenPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/lists" element={<ListItems />} />
            <Route path="/createitinerary" element={<ItinerariesForm />} />
            <Route path="/modifyitinerary/:id" element={<ModifyItinerary />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/itinerary/:id" element={<Itinerary />} />
            <Route path="/place/:id" element={<PlaceView />} />
            <Route path='/createPlace' element={<CreatePlaceView />} />
          </Routes>
        </BrowserRouter>
      </main> 
      <Footer /> 
    </>
  );
  }else{
    return <h1>Loading</h1>
  }
}
export default App