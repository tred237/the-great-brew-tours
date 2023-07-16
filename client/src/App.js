import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSession } from "./features/session/sessionSlice";
import NavBar from "./features/NavBar";
import Home from "./HomePage";
import Login from "./features/session/LoginPage";
import Brewery from "./features/brewery/BreweryPage";
import ReviewedBreweries from "./features/reviewedBreweries/ReviewedBreweriesPage";
import Tours from "./features/tours/ToursPage";
import { fetchScheduledTours } from "./features/scheduledTours/scheduledToursSlice";

export default function App() {
  const state = useSelector((state) => state);
  const loggedIn = useSelector((state) => state.session.loggedIn);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSession())
    .unwrap()
    .then(() => dispatch(fetchScheduledTours()))
    .catch(err => err)
  },[loggedIn, dispatch])

  console.log(state)

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/breweries/:id" element={<Brewery />} />
        <Route exact path="/reviewed-breweries" element={<ReviewedBreweries />} />
        <Route exact path="/tours" element={<Tours />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}