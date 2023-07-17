import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchAddScheduleTour = createAsyncThunk("scheduledTours/fetchAddScheduleTour", async (scheduledTour, thunkAPI) => {
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

export const fetchEditScheduleTour = createAsyncThunk("scheduledTours/fetchEditScheduleTour", async (scheduledTour, thunkAPI) => {
    try {
        const response = await fetch(`/scheduled_tours/${scheduledTour.scheduledTourId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                number_of_people: scheduledTour.numberOfPeople,
            })
        })
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
    addScheduleTourErrors: null,
    scheduledToursErrors: null,
}

const scheduledToursSlice = createSlice({
    name: "scheduledTours",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchAddScheduleTour.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAddScheduleTour.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.scheduledTours.push(action.payload)
            state.addScheduleTourErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchAddScheduleTour.rejected, (state, action) => {
            state.status = 'failed'
            state.addScheduleTourErrors = action.payload.errors
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

        .addCase(fetchEditScheduleTour.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchEditScheduleTour.fulfilled, (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload)
            const filteredScheduledTours = current(state.scheduledTours).filter(t => t.id !== action.payload.id)
            state.scheduledTours = [action.payload, ...filteredScheduledTours]
            state.scheduledToursErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchEditScheduleTour.rejected, (state, action) => {
            state.status = 'failed'
            state.scheduledToursErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })
    }
});

export default scheduledToursSlice.reducer;