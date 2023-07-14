import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviewedBreweries = createAsyncThunk("breweries/fetchReviewedBreweries", async (_, thunkAPI) => {
  try { 
    const response = await fetch("/reviewed-breweries")
    const data = await response.json()
    if(response.ok) return data
    else return thunkAPI.rejectWithValue(data)
  } catch(err) {
    return thunkAPI.rejectWithValue(err)
  }
});

const initialState = {
    reviewedBreweries: [],
    status: "idle",
    reviewedBreweriesErrors: null,
    reduxErrors: null,
}

const reviewedBreweriesSlice = createSlice({
    name: "reviewedBreweries",
    initialState,
    reducers: {
        addReviewedBrewery: (state, action) => {
            if(!state.reviewedBreweries.find(b => b.id === action.payload.id)) state.reviewedBreweries.unshift(action.payload)
        },
        resetReviewedBreweries: () => initialState
        // removeReviewedBreweries: (state) => {
        //     state.reviewedBreweries = []
        //     state.status = "idle"
        //     state.reviewedBreweriesErrors = null
        //     state.reduxErrors = null
        // },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchReviewedBreweries.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchReviewedBreweries.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.reviewedBreweries = action.payload
          state.reviewedBreweriesErrors = null
        })
        .addCase(fetchReviewedBreweries.rejected, (state, action) => {
          state.status = 'failed'
          state.reviewedBreweriesErrors = action.payload
          state.reduxError = action.error.message
        })
    }
});

export const { addReviewedBrewery, resetReviewedBreweries } = reviewedBreweriesSlice.actions; 

export default reviewedBreweriesSlice.reducer;