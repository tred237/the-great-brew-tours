import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSession } from "./features/session/sessionSlice";
import NavBar from "./features/NavBar";
import Home from "./features/HomePage";
import Brewery from "./features/brewery/BreweryPage";
import ReviewedBreweries from "./features/reviewedBreweries/ReviewedBreweriesPage";
import Tours from "./features/tours/ToursPage";
import ScheduledTours from "./features/scheduledTours/ScheduledToursPage";

export default function App() {
  const state = useSelector(state => state);
  const isLoggedIn = useSelector((state) => state.session.loggedIn);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSession())
  },[isLoggedIn, dispatch])

  console.log(state)

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/breweries/:id" element={<Brewery />} />
        <Route exact path="/reviewed-breweries" element={<ReviewedBreweries />} />
        <Route exact path="/tours" element={<Tours />} />
        <Route exact path="/scheduled-tours" element={<ScheduledTours />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}