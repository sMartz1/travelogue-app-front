import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import ProfileInfo from "./components/ProfileInfo"
import ListItems from "./components/ListItems"
import Footer from "./components/Footer";
import Header from "./components/Header/Header"
import Landpage from "./components/LandPage";
function App() {
  return (<>
    <Header />
    <main className="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileInfo />} />
<<<<<<< HEAD
          <Route path="/lists" element={<ListItems />} />

=======
>>>>>>> db65769213da02341bbfcce5017c968af7a95555
        </Routes>
      </BrowserRouter>
    </main> 
    <Footer /> 
    </>
  );
}

export default App;
