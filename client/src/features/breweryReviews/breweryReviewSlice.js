import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAddReview = createAsyncThunk("breweryReviews/fetchAddReview", (reviewData) => {
    return fetch('/brewery_reviews', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
            .then(res => res.json())
            .then(data => data)
});

const breweryReviewSlice = createSlice({
  name: "breweryReviews",
  initialState: {
    reviews: [],
    status: "idle",
  },
  reducers: {
    removeReviews: (state) => {
        state.reviews = []
        state.status = "idle"
        delete state.errors
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddReview.fulfilled, (state, action) => {
        if('errors' in action.payload) state.errors = action.payload
        else {
            state.status = 'succeeded'
            state.reviews.push(action.payload)
            delete state.errors
        }
      })
      .addCase(fetchAddReview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { removeReviews } = breweryReviewSlice.actions; 

export default breweryReviewSlice.reducer;