import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "./features/breweries/HomePage";
import BreweryPage from "./features/brewery/BreweryPage";
import LoginPage from "./features/session/LoginPage";
import { fetchSession } from "./features/session/sessionSlice";
import NavBar from "./features/NavBar";

export default function App() {
  const state = useSelector((state) => state);
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const dispatch = useDispatch()
  console.log(state)

  // useEffect(() => {
  //   dispatch(fetchSession())
  // },[loggedIn])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/breweries/:id" element={<BreweryPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}