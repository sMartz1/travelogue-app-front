import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="main-container">
      {/* <Header />   */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h2>Landpage</h2>} />
        </Routes>
      </BrowserRouter>
      {/* <Footer />   */}
    </main>
  );
}

export default App;
