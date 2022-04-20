import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"

function App() {
  return (
    <main className="main-container">
      {/* <Header />   */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h2>Landpage</h2>} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
      {/* <Footer />   */}
    </main>
  );
}

export default App;
