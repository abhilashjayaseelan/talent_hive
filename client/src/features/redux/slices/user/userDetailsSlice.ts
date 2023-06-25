import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userData } from "../../../axios/api/user/userDetails";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await userData();
  return response;
});

interface UserDetailsState {
  userDetails: any;
  error: string | null;
  status: string;
}

const initialState: UserDetailsState = {
  userDetails: null,
  error: null,
  status: "idle",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
    })
    .addCase(fetchUser.rejected, (state, action)=> {
        state.status = 'failed';
        state.error = action.error.message ?? null;
    });
  }
});

export const {clearUserDetails, setError} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
