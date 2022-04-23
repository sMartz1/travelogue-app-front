import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Footer from "./components/Footer";
import Landpage from "./components/LandPage";

function App() {
  return (<>
    <main className="main-container">
      {/* <Header />   */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landpage/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
       
    </main> <Footer />  </>
  );
}

export default App;
