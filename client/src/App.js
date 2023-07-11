import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import HomePage from "./features/breweries/HomePage";
import BreweryPage from "./features/brewery/BreweryPage";
import LoginPage from "./features/session/LoginPage";
import { useEffect } from "react";
import { fetchSession } from "./features/session/sessionSlice";

export default function App() {
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.session.loggedIn);
  const dispatch = useDispatch()
  console.log(state)
  console.log(user)

  useEffect(() => {
    dispatch(fetchSession())
  },[user])

  return (
    <div className="App">
      <NavLink to="/breweries/1">brewery</NavLink>;
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/breweries/:id" element={<BreweryPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}