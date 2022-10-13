import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DoktorByUsername from "./components/DoktorbyUsername";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import BoardApoteka from "./components/BoardApoteka";
import BoardBolnica from "./components/BolnicaBoard";
import BoardDoktor from "./components/BoardDoktor";
import BoardKanton from "./components/BoardKanton";
import BoardPacijent from "./components/BoardPacijent";
import LijekoviAdd from "./components/LijekoviAdd";
import Pregled from "./components/Pregled";
import Pregledi from "./components/Pregledi";
import StatusPacijenta from "./components/StatusPacijenta";
import Recepti from "./components/Recepti";
import StatusUserRecepta from "./components/StatusUserRecepta";
import ZakaziPregled from "./components/ZakaziPregled";
import ProfileForma from "./components/ProfileForma";
import OcjenaDoktora from "./components/OcjenaDoktora";
import PregledId from "./components/PregledId";
import User from "./components/User";
import Lijek from "./components/Lijek";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showBolnicaBoard, setShowBolnicaBoard] = useState(false);
  const [showPacijentBoard, setShowPacijentBoard] = useState(false);
  const [showDoktorBoard, setShowDoktorBoard] = useState(false);
  const [showKantonBoard, setShowKantonBoard] = useState(false);
  const [showApotekaBoard, setShowApotekaBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [preuzmiId,setPreuzmiId]=useState('')
  
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowApotekaBoard(user.roles.includes("ROLE_ADMIN APOTEKA"));
      setShowBolnicaBoard(user.roles.includes("ROLE_ADMIN BOLNICA"));
      setShowDoktorBoard(user.roles.includes("ROLE_DOKTOR"));
      setShowKantonBoard(user.roles.includes("ROLE_ADMIN KANTON"));
      setShowPacijentBoard(user.roles.includes("ROLE_PACIJENT"));


      
      setPreuzmiId(user.id)
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  console.log(preuzmiId)
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
       
        <Link to={"/"} className="navbar-brand">
     <img src={'/logo.png'} style={{'height':'80px'}} />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showBolnicaBoard && (
            <>
            <li className="nav-item">
              <Link to={"/bolnica"} className="nav-link">
                Bolnica Board
              </Link>
              </li>
              <li className="nav-item">
              <Link to={"/recept"} className="nav-link">
                Recept
              </Link>
            </li>
          
            </>
          )}
            {showApotekaBoard && (
            <li className="nav-item">
              <Link to={"/apoteka"} className="nav-link">
                Apoteka Board
              </Link>
            </li>
          )}

{showPacijentBoard&& (
  <>
            <li className="nav-item">
              <Link to={"/pregled"} className="nav-link">
                Zakazi Pregled
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/stat-user-rec"} className="nav-link">
                Status Recepta
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/statusPacijenta"} className="nav-link">
              Status Pregleda
            </Link>
          </li>
          </>
          )}



            {showKantonBoard && (
            <li className="nav-item">
              <Link to={"/kanton"} className="nav-link">
                Kanton Board
              </Link>
            </li>
          )}
            {showDoktorBoard && (
              <>
            <li className="nav-item">
              <Link to={"/doktor"} className="nav-link">
                Doktor Board
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/pregledi"} className="nav-link">
                Pregledi
              </Link>
            </li>



            
            </>
          )}
          {showAdminBoard && (
            <>           <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
               <li className="nav-item">
               <Link to={"/dodajLijek"} className="nav-link">
                 Dodaj Lijek
               </Link>
             </li>
             </> 
          )}
     
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
              <p>{currentUser._id}</p>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pregled" element={<Pregled user={preuzmiId}/>} />
          <Route path="/pregledi" element={<Pregledi user={preuzmiId}/>} />
          <Route path="/stat-user-rec" element={<StatusUserRecepta user={preuzmiId}/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/statusPacijenta" element={<StatusPacijenta user={preuzmiId}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/forma" element={<ProfileForma/>} />
          <Route path="/ocjena/:id" element={<OcjenaDoktora/>} />
          <Route path="/pregled/:id" element={<DoktorByUsername/>} />
          <Route path="/cruds/:id" element={<PregledId/>} />
          <Route path="/recept" element={<Recepti/>} />
          <Route path="/pacijent" element={<BoardPacijent/>} />
          <Route exact path="/dodajLijek" element={<LijekoviAdd />} />
          <Route path="/bolnica" element={<BoardBolnica id33={preuzmiId} />} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/doktor" element={<BoardDoktor/>} />
          <Route path="/zakazi/:id" element={<ZakaziPregled user={preuzmiId}/>} />
          <Route path="/user/:id" element={<User/>} />
          <Route path="/lijek/:id" element={<Lijek/>} />
          <Route path="/apoteka" element={<BoardApoteka/>} />
          <Route path="/kanton" element={<BoardKanton  />} />
          <Route path="/admin" element={<BoardAdmin role={showAdminBoard}/>} />
        </Routes>
      </div>
    </div>
  );
};
export default App;