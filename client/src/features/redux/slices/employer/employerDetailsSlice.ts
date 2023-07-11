import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { employerData } from "../../../axios/api/employer/employerDetails";

export const fetchEmployer = createAsyncThunk(
  "employer/fetchEmployer",
  async () => {
    const response = await employerData();
    return response;
  }
);

interface EmployerDetailsState {
  employerEmail: string | null;
  employerDetails: any;
  error: string | null;
  status: string;
  isLoggedIn: boolean;
}

const initialState: EmployerDetailsState = {
  employerEmail: null,
  employerDetails: null,
  error: null,
  status: "idle",
  isLoggedIn: false,
};

const employerDetailsSlice = createSlice({
  name: "employerDetails",
  initialState,
  reducers: {
    clearEmployerDetails: (state) => {
      state.employerDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    employerLoginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    employerLogout: (state) => {
      state.isLoggedIn = false;
    },
    employerEmail: (state, action: PayloadAction<string>) => {
      state.employerEmail = action.payload;
    },
    clearEmployerEmail: (state) => {
      state.employerEmail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployer.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.employerDetails = action.payload;
      })
      .addCase(fetchEmployer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  clearEmployerDetails,
  setError,
  employerLoginSuccess,
  employerLogout,
  employerEmail,
  clearEmployerEmail
} = employerDetailsSlice.actions;

export default employerDetailsSlice.reducer;
