import { configureStore } from "@reduxjs/toolkit";

import breweriesReducer from "./features/breweries/breweriesSlice";
import breweryReducer from "./features/brewery/brewerySlice";
import sessionReducer from "./features/session/sessionSlice";
import breweryReviewReducer from "./features/breweryReviews/breweryReviewSlice";
import reviewedBreweriesReducer from "./features/reviewedBreweries/reviewedBreweriesSlice";

const store = configureStore({
  reducer: {
    breweries: breweriesReducer,
    brewery: breweryReducer,
    session: sessionReducer,
    reviews: breweryReviewReducer,
    reviewedBreweries: reviewedBreweriesReducer
  },
});

export default store;