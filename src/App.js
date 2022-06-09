import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Result from "./pages/result";
import Offer from "./pages/offer";
import Register from "./pages/register";
import Login from "./pages/login";
import Newoffer from "./pages/create_offer"
import Admin from "./pages/admin"
import AllOffer from "./pages/allOffer"
import UserProfile from "./pages/profile";
import Host from "./pages/host";
import CGU from "./pages/cgu"
import FonctionnementSite from "./pages/FonctionnementSite";
import './App.css';


function App() {

  return (
    <Router>      
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/newOffer" element={<Newoffer />}></Route>
          <Route exact path="/result/:iterate" element={<Result />}></Route>
          <Route path="/offer/:id" element={<Offer />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/profile" element={<UserProfile />}></Route>
          <Route exact path="/host" element={<Host />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route excat path="/all" element={<AllOffer />}></Route>
          <Route excat path="/admin" element={<Admin />}></Route>
          <Route exact path="/cgu" element={<CGU />}></Route>
          <Route exact path="/fonctionnement" element={<FonctionnementSite />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
