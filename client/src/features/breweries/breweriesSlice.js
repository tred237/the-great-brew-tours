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

export const fetchAddBrewery = createAsyncThunk("tours/fetchAddBrewery", async(breweryData, thunkAPI) => {
  try { 
    const response = await fetch(`/breweries`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: breweryData.breweryName,
        website: breweryData.website,
        address: breweryData.address,
        city: breweryData.city,
        postal_code: breweryData.postalCode,
        image: breweryData.image,
      })
    })
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
  addBreweryErrors: null,
}

const breweriesSlice = createSlice({
    name: "breweries",
    initialState,
    reducers: {
      breweryEdited: (state, action) => {
        console.log(action.payload)
        const editedBrewery = state.breweries.find(b => b.id === action.payload.id)
        console.log(editedBrewery)
        editedBrewery.name = action.payload.name
        editedBrewery.city = action.payload.city
        editedBrewery.postal_code = action.payload.postal_code
        editedBrewery.image = action.payload.image
        const filteredBreweries = state.breweries.filter(b => b.id !== action.payload.id)
        state.breweries = [...filteredBreweries, editedBrewery]
      }
    },
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

        .addCase(fetchAddBrewery.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchAddBrewery.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.breweries.push(action.payload)
          state.addBreweryErrors = null
          state.reduxErrors = null
        })
        .addCase(fetchAddBrewery.rejected, (state, action) => {
          state.addBreweryErrors = null
          state.status = 'failed'
          state.addBreweryErrors = action.payload.errors
          state.reduxErrors = action.error.message
        })
    }
});

export const { breweryEdited } = breweriesSlice.actions; 

export default breweriesSlice.reducer;