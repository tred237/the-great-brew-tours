import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import HomePage from "./features/breweries/HomePage";
import BreweryPage from "./features/brewery/BreweryPage";
import LoginPage from "./features/session/LoginPage";

export default function App() {
  const state = useSelector((state) => state);
  console.log(state)
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