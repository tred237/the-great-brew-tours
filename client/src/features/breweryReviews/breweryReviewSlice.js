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
      .addCase(fetchAddReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if('errors' in action.payload) state.addErrors = action.payload
        else {
            state.reviews.push(action.payload)
            delete state.addErrors
        }
      })
      .addCase(fetchAddReview.rejected, (state, action) => {
        state.status = 'failed'
        state.reduxError = action.error.message
      })

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