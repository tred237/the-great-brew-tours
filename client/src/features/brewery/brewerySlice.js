import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrewery = createAsyncThunk("breweries/fetchBrewery", (breweryId) => {

  // why can i not check if the the response if valid?
  // i want to not have to save the errors to state if promise if not 200
        return fetch(`/breweries/${breweryId}`)
              .then((res) => res.json())
              .then(brewery => brewery)
        // // return fetch(`/breweries/${breweryId}`)
        // //         .then((res) => res.json())
        // //         .then(brewery => brewery)
        // return fetch(`/breweries/${breweryId}`)
        // .then(res => {
        //     if(res.ok) res.json().then(brewery => brewery)
        // else res.json().then(err => err.errors)
        // })
});

const brewerySlice = createSlice({
    name: "brewery",
    initialState: {
      entities: [],
      status: "idle",
    },
    reducers: {
      breweryAdded(state, action) {
        state.entities.push(action.payload)
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchBrewery.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchBrewery.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.entities = action.payload
        })
        .addCase(fetchBrewery.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
});

export default brewerySlice.reducer;