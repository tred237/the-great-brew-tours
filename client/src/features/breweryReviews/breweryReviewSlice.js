import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEditReview = createAsyncThunk("breweryReviews/fetchEditReview", (reviewData) => {
    return fetch(`/brewery_reviews/${reviewData.reviewId}}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                return data
            })
});

const initialState = {
    reviews: [],
    status: "idle",
}

const breweryReviewSlice = createSlice({
  name: "breweryReviews",
  initialState,
  reducers: {
    removeReviews: (state) => {
        state.reviews = []
        state.status = "idle"
        delete state.errors
    },
    removeErrors: (state) => {
        delete state.addErrors
        delete state.editErrors
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEditReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEditReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if('errors' in action.payload) state.editErrors = action.payload
        else {
            state.reviews = state.reviews.filter(r => r.id !== action.payload.id)
            state.reviews.push(action.payload)
            delete state.editErrors
        }
      })
      .addCase(fetchEditReview.rejected, (state, action) => {
        state.status = 'failed'
        state.reduxError = action.error.message
      })
  }
});

export const { removeReviews, removeErrors } = breweryReviewSlice.actions; 

export default breweryReviewSlice.reducer;