import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
    name: 'authorization',
    initialState: {
        pass: '123',
        status: false,
        userData: null
    },
    reducers: {
        login: (state, action) => {
            state.status = true
        },
        logout: (state, action) => {
            state.status = false
            state.userData = null;
        }
    }
})


export const { login, logout } = auth.actions;

export default auth.reducer;