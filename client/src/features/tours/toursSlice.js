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
    reducers: {
      scheduledTourAdded: (state, action) => {
        const tour = state.tours.find(t => t.id === action.payload.tour_id)
        tour.taken_slots = tour.taken_slots + action.payload.number_of_people
        const filteredTours = state.tours.filter(t => t.id !== action.payload.tour_id)
        state.tours = [tour, ...filteredTours]
      },
    },
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

export const { scheduledTourAdded } = toursSlice.actions; 

export default toursSlice.reducer;