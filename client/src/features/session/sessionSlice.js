import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("session/fetchLogin", async (loginCredentials, thunkAPI) => {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        })
        const data = await response.json()
        if (response.ok) return data
        else return thunkAPI.rejectWithValue(data)     
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
});

export const fetchSession = createAsyncThunk("session/fetchSession", async (_, thunkAPI) => {
    // console.log("fetch session running")
    try {
        const response = await fetch('/logged-in-user')
        const data = await response.json()
        if(response.ok) return data
        else return thunkAPI.rejectWithValue(data) 
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const fetchLogout = createAsyncThunk("session/fetchLogout", async (_, thunkAPI) => {
    try { 
        const response = await fetch('/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        if(response.ok) return data
        else return thunkAPI.rejectWithValue(data)  
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
})

const initialState = {
    user: {},
    loggedIn: false,
    status: 'idle',
    reduxErrors: null,
    loginErrors: null,
    sessionErrors: null,
    logoutErrors: null,
}

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        resetSession: () => initialState 
    },
    extraReducers(builder) {
      builder
        .addCase(fetchLogin.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.loggedIn = true
            state.user = action.payload
            state.loginErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.status = 'failed'
            state.loginErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })

        .addCase(fetchSession.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchSession.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.loggedIn = true
            state.user = action.payload
            state.sessionErrors = null
            state.reduxErrors = null
        })
        .addCase(fetchSession.rejected, (state, action) => {
            state.status = 'failed'
            state.sessionErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })


        .addCase(fetchLogout.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchLogout.fulfilled, (state) => {
            state.status = 'succeeded'
            state.loggedIn = false
            state.user = {}
            state.loginErrors = null
            state.sessionErrors = null
            state.logoutErrors = null
        })
        .addCase(fetchLogout.rejected, (state, action) => {
            state.status = 'failed'
            state.logoutErrors = action.payload.errors
            state.reduxErrors = action.error.message
        })
    }
});

export const { resetSession } = sessionSlice.actions; 

export default sessionSlice.reducer;