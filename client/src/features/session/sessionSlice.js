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
    // console.log("fetch session running")
    return fetch('/logged-in-user')
            .then(res => res.json())
            .then(data => data)
})

export const fetchLogout = createAsyncThunk("session/fetchLogout", () => {
    return fetch('/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
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
            state.status = 'succeeded'
            if('errors' in action.payload) {
                state.loginErrors = action.payload
            } else {
                state.loggedIn = true
                state.user = action.payload
                delete state.loginErrors
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
            state.status = 'succeeded'
            if('errors' in action.payload) {
                state.sessionErrors = action.payload
            } else {
                state.loggedIn = true
                state.user = action.payload
                delete state.sessionErrors
            }
        })
        .addCase(fetchSession.rejected, (state, action) => {
            state.status = 'failed'
            state.actionError = action.error.message
        })


        .addCase(fetchLogout.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchLogout.fulfilled, (state, action) => {
            state.status = 'succeeded'
            if('errors' in action.payload) {
                state.logoutErrors = action.payload
            } else {
                state.loggedIn = false
                state.user = {}
                delete state.loginErrors
                delete state.sessionErrors
                delete state.logoutErrors
            }
        })
        .addCase(fetchLogout.rejected, (state, action) => {
            state.status = 'failed'
            state.actionError = action.error.message
        })
    }
});

export default sessionSlice.reducer;