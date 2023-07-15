import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTours = createAsyncThunk("tours/fetchTours", async(_, thunkAPI) => {
  try { 
    const response = await fetch("/tours")
    const data = await response.json()
    if(response.ok) return data
    else return thunkAPI.rejectWithValue(data)
  } catch(err) {
    return thunkAPI.rejectWithValue(err)
  }
});

const initialState =  {
  tours: [],
  status: "idle",
  toursErrors: null,
  reduxErrors: null,
}

const toursSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchTours.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchTours.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.tours = action.payload
          state.toursErrors = null
          state.reduxErrors = null
        })
        .addCase(fetchTours.rejected, (state, action) => {
          state.status = 'failed'
          state.toursErrors = action.payload.errors
          state.reduxErrors = action.error.message
        })
    }
});

export default toursSlice.reducer;