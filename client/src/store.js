import { configureStore } from "@reduxjs/toolkit";

import breweriesReducer from "./features/breweries/breweriesSlice";

const store = configureStore({
  reducer: {
    breweries: breweriesReducer,
  },
});

export default store;