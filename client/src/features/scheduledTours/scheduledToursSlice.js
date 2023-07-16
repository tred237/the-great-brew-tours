import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchScheduleTour = createAsyncThunk("scheduledTours/fetchScheduleTour", async (scheduledTour, thunkAPI) => {
    try {
        const response = await fetch('/scheduled_tours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                tour_id: scheduledTour.tour_id,
                number_of_people: scheduledTour.numberOfPeople,
            })
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) return data
        else return thunkAPI.rejectWithValue(data)     
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
});

export const fetchScheduledTours = createAsyncThunk("scheduledTours/fetchScheduledTours", async (thunkAPI) => {
    try {
        const response = await fetch('/scheduled_tours')
        const data = await response.json()
        if (response.ok) return data
        else return thunkAPI.rejectWithValue(data)     
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
});

const initialState = {
    scheduledTours: [],
    status: 'idle',
    reduxErrors: null,
    scheduleTourErrors: null,
    scheduledToursErrors: null,
}

const scheduledToursSlice = createSlice({
    name: "scheduledTours",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchScheduleTour.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchScheduleTour.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.scheduledTours.push(action.payload)
            state.scheduleTourErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchScheduleTour.rejected, (state, action) => {
            state.status = 'failed'
            state.scheduleTourErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })

        .addCase(fetchScheduledTours.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchScheduledTours.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.scheduledTours = action.payload
            state.scheduledToursErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchScheduledTours.rejected, (state, action) => {
            state.status = 'failed'
            state.scheduledToursErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })
    }
});

export default scheduledToursSlice.reducer;