import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("session/fetchLogin", (loginCredentials) => {
    return fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginCredentials)
            })
            .then((res) => res.json())
            .then(data => data)
});

export const fetchSession = createAsyncThunk("session/fetchSession", () => {
    console.log("fetch session running")
    return fetch('/logged-in-user')
            .then(res => res.json())
            .then(data => data)
})

const sessionSlice = createSlice({
    name: "session",
    initialState: {
      user: {},
      loggedIn: false,
      status: 'idle'
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchLogin.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            if('errors' in action.payload) {
                state.status = 'succeeded'
                state.errors = action.payload
            } else {
                state.loggedIn = true
                state.status = 'succeeded'
                state.user = action.payload
                delete state.errors
            }
        })
        .addCase(fetchLogin.rejected, (state, action) => {
          state.status = 'failed'
          state.actionError = action.error.message
        })


        .addCase(fetchSession.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchSession.fulfilled, (state, action) => {
            if('errors' in action.payload) {
                state.status = 'succeeded'
                state.errors = action.payload
            } else {
                state.loggedIn = true
                state.status = 'succeeded'
                state.user = action.payload
                delete state.errors
            }
        })
        .addCase(fetchSession.rejected, (state, action) => {
            state.status = 'failed'
            state.actionError = action.error.message
        })
    }
});

export default sessionSlice.reducer;