import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Nav from './components/Nav'
import Recommend from "./components/Recommend";
import LandingPage from "./components/LandingPage";


function App() {
  return (
      <Router>
          <Nav /> {/* Navbar remains persistent across pages */}
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/predict" element={<Recommend />} />
          </Routes>
      </Router>
  );
}

export default App
