import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import Header from "./components/Header/Header"
import Footer from "./components/Footer"
function App() {
  return (
    <main className="main-container">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h2>Landpage</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
       <Footer />   
    </main>
  );
}

export default App;
