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

export const fetchDeleteScheduleTour = createAsyncThunk("scheduledTours/fetchDeleteScheduleTour", async (scheduledTour, thunkAPI) => {
    try {
        const response = await fetch(`/scheduled_tours/${scheduledTour.scheduledTourId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
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
    editScheduledTourErrors: null,
    deleteScheduledTourErrors: null,
}

const scheduledToursSlice = createSlice({
    name: "scheduledTours",
    initialState,
    reducers: {
        resetScheduledTours: () => initialState
    },
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
            const filteredScheduledTours = current(state.scheduledTours).filter(t => t.id !== action.payload.id)
            state.scheduledTours = [action.payload, ...filteredScheduledTours]
            state.editScheduledTourErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchEditScheduleTour.rejected, (state, action) => {
            state.status = 'failed'
            state.editScheduledTourErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })

        .addCase(fetchDeleteScheduleTour.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchDeleteScheduleTour.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const filteredScheduledTours = current(state.scheduledTours).filter(t => t.id !== action.payload.id)
            state.scheduledTours = filteredScheduledTours
            state.deleteScheduledTourErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchDeleteScheduleTour.rejected, (state, action) => {
            state.status = 'failed'
            state.deleteScheduledTourErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })
    }
});

export const { resetScheduledTours } = scheduledToursSlice.actions; 

export default scheduledToursSlice.reducer;