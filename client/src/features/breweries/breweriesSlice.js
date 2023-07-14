import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBreweries = createAsyncThunk("breweries/fetchBreweries", async(_, thunkAPI) => {
  try { 
    const response = await fetch("/breweries")
    const data = await response.json()
    if(response.ok) return data
    else return thunkAPI.rejectWithValue(data)
  } catch(err) {
    return thunkAPI.rejectWithValue(err)
  }
});

const initialState =  {
  breweries: [],
  status: "idle",
  breweriesErrors: null,
  reduxErrors: null,
}

const breweriesSlice = createSlice({
    name: "breweries",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchBreweries.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchBreweries.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.breweries = action.payload
          state.breweriesErrors = null
          state.reduxErrors = null
        })
        .addCase(fetchBreweries.rejected, (state, action) => {
          state.status = 'failed'
          state.breweriesErrors = action.payload.errors
          state.reduxErrors = action.error.message
        })
    }
});

export default breweriesSlice.reducer;