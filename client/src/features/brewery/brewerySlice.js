import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchBrewery = createAsyncThunk("brewery/fetchBrewery", (breweryId) => {
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

export const fetchDeleteReview = createAsyncThunk("brewery/fetchDeleteReview", (reviewId) => {
  return fetch(`/brewery_reviews/${reviewId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          })
        .then((res) => res.json())
        .then(data => data)
});

const brewerySlice = createSlice({
  name: "brewery",
  initialState: {
    brewery: {},
    status: "idle",
  },
  reducers: {
    reviewAdded: (state, action) => {
      state.brewery.brewery_reviews.unshift(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBrewery.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBrewery.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brewery = action.payload
      })
      .addCase(fetchBrewery.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetchDeleteReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDeleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if('errors' in action.payload) {
          state.brewery_review_errors = action.payload
        } else {
          state.brewery.brewery_reviews = state.brewery.brewery_reviews.filter(r => r.id !== action.payload.id)
          delete state.brewery_review_errors
        }
      })
      .addCase(fetchDeleteReview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { reviewAdded } = brewerySlice.actions; 

export default brewerySlice.reducer;