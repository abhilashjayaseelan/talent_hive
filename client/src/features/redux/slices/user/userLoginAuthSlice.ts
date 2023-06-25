import { createSlice } from "@reduxjs/toolkit";

const userLoginAuthSlice = createSlice({
    name: 'user-auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) =>{
            state.isLoggedIn = false;
        }
    }
});

export const {loginSuccess, logout} = userLoginAuthSlice.actions;
export default userLoginAuthSlice.reducer;