import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrewery = createAsyncThunk("brewery/fetchBrewery", (breweryId) => {
  return fetch(`/breweries/${breweryId}`)
        .then((res) => res.json())
        .then(brewery => brewery)
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
    },
    reviewEdited: (state, action) => {
      state.brewery.brewery_reviews = state.brewery.brewery_reviews.filter(r => r.id !== action.payload.id)
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

export const { reviewAdded, reviewEdited } = brewerySlice.actions; 

export default brewerySlice.reducer;