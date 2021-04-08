import Home from "./components/Home/Home"
import NavMenu from "./components/Home/NavMenu"
import Auth from "./components/authentication/Auth";
import Profile from "./components/User/Profile";
import Test from "./components/Test"
import Detail from './components/Detail/Detail'
import UserContext from './components/authentication/UserContext'
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  Route, useParams
} from "react-router-dom";


function App() {
  const [authUser, setAuthUser] = useState(null)
  const [signingIn, setSigningIn] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSigningIn(false);
      return;
    }
    try {
      fetch('http://localhost:5000/auth/me', {
        method: "POST",
        headers: {
          Accepts: "application/json",
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        },

      })
        .then(res => res.json()).then((result)=>{
          setAuthUser(result)
          setSigningIn(false)
        })
        
    } catch (e) {
      setSigningIn(false)
    }
  }, [])

  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
      <NavMenu />
      <Container style={{ minHeight: "100vh" }}>
        <Route exact={true} path="/"><Home /></Route>
        <Route path="/auth"><Auth /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/test"><Test /></Route>
        <Route path="/detail/:id"><Detail /></Route>
      </Container>
    </UserContext.Provider>
  );
}

export default App;

