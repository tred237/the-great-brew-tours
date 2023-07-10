import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBreweries = createAsyncThunk("breweries/fetchBreweries", () => {
    return fetch("/breweries")
            .then((res) => res.json())
            .then(breweries => breweries)
});

const breweriesSlice = createSlice({
    name: "breweries",
    initialState: {
      entities: [],
      status: "idle",
    },
    reducers: {
      breweryAdded(state, action) {
        if (!state.entities.find(action.payload.id)) state.entities.push(action.payload);
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchBreweries.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchBreweries.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.entities = action.payload
        })
        .addCase(fetchBreweries.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
});

export const { breweryAdded } = breweriesSlice.actions;

export default breweriesSlice.reducer;