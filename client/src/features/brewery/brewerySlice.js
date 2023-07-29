import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrewery = createAsyncThunk("brewery/fetchBrewery", async (breweryId, thunkAPI) => {
  // console.log(breweryId)
  try{
    const response = await fetch(`/breweries/${breweryId.toString()}`)
    // console.log(response)
    const data = await response.json()
    // console.log(breweryId)
    if(response.ok) return data
    else return thunkAPI.rejectWithValue(data) 
  } catch(err) {
    return thunkAPI.rejectWithValue(err)
  }
});

// export const fetchBrewery = createAsyncThunk("brewery/fetchBrewery", (breweryId) => {
//   // console.log(breweryId)
//   return fetch(`/breweries/${breweryId}`)
//           .then(response => {
//             console.log(response)
//             return response.json()
//           })
//           .then(data => data)
//           // .catch()
// });

export const fetchDeleteReview = createAsyncThunk("brewery/fetchDeleteReview", async (reviewId, thunkAPI) => {
  try { 
    const response = await fetch(`/brewery_reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const data = await response.json()
    if(response.ok) return data
    else return thunkAPI.rejectWithValue(data) 
  } catch(err) {
    return thunkAPI.rejectWithValue(err)
  }
});

export const fetchEditBrewery = createAsyncThunk("tours/fetchEditBrewery", async(breweryData, thunkAPI) => {
  console.log(breweryData.breweryId)
  try { 
    const response = await fetch(`/breweries/${breweryData.breweryId}`, {
      method: "PATCH",
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
      })
    })
    const data = await response.json()
    if(response.ok) return data
    else return thunkAPI.rejectWithValue(data)
  } catch(err) {
    return thunkAPI.rejectWithValue(err)
  }
});

const brewerySlice = createSlice({
  name: "brewery",
  initialState: {
    brewery: {},
    status: "idle",
    getBreweryErrors: null,
    deleteReviewsErrors: null,
    editBreweryErrors: null,
    reduxErrors: null,
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
  // extraReducers: {
  //   [fetchBrewery.loading]: (state) => {
  //      state.status = 'loading'
  //   },
  //   [fetchBrewery.fulfilled]: (state, action) => {
  //         state.status = 'succeeded'
  //         state.brewery = action.payload
  //         state.getBreweryErrors = null
  //         state.reduxErrors = null
  //   },
  //   [fetchBrewery.rejected]: (state, action) => {
  //     console.log(action)
  //           state.status = 'failed'
  //           state.getBreweryErrors = action.payload
  //           state.reduxErrors = action.error.message
  //   }
  // }
  extraReducers(builder) {
    builder
      .addCase(fetchBrewery.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBrewery.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brewery = action.payload
        state.getBreweryErrors = null
        state.reduxErrors = null
      })
      .addCase(fetchBrewery.rejected, (state, action) => {
        state.status = 'failed'
        state.getBreweryErrors = action.payload.errors
        state.reduxErrors = action.error.message
      })

      .addCase(fetchDeleteReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDeleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.brewery.brewery_reviews = state.brewery.brewery_reviews.filter(r => r.id !== action.payload.id)
        state.deleteReviewsErrors = null
        state.reduxErrors = null
      })
      .addCase(fetchDeleteReview.rejected, (state, action) => {
        state.status = 'failed'
        state.deleteReviewsErrors = action.payload.errors
        state.reduxErrors = action.error.message
      })

      .addCase(fetchEditBrewery.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEditBrewery.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = 'succeeded'
        state.brewery = action.payload
        state.editBreweryErrors = null
        state.reduxErrors = null
      })
      .addCase(fetchEditBrewery.rejected, (state, action) => {
        state.editBreweryErrors = null
        state.status = 'failed'
        state.editBreweryErrors = action.payload.errors
        state.reduxErrors = action.error.message
      })
  }
});

export const { reviewAdded, reviewEdited } = brewerySlice.actions; 

export default brewerySlice.reducer;