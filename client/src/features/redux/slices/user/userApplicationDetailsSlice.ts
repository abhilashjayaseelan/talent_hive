import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { applicationDetails } from "../../../axios/api/user/userJobApplication";

export const fetchApplicationDetails = createAsyncThunk(
    "application/fetchDetails",
    async (id: string) => {
        if(id) {
            const response = await applicationDetails(id);
            return response;
        }
    }
)

interface ApplicationDetailsState {
    applicationId : string | null;
    applicationDetails: any | null;
    error: string | null;
    status: string;
}

const initialState: ApplicationDetailsState = {
    applicationId: null,
    applicationDetails: null,
    error: null,
    status: 'idle',
};

const applicationDetailsSlice = createSlice({
    name: 'applicationDetails',
    initialState,
    reducers: {
        clearApplicationDetails: (state) => {
            state.applicationDetails = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setApplicationId: (state, action: PayloadAction<string>) => {
            state.applicationId = action.payload;
        },
        clearApplicationId: (state) => {
            state.applicationId = null;
        }
    }, 
    extraReducers: (builder) => {
        builder
          .addCase(fetchApplicationDetails.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchApplicationDetails.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.applicationDetails = action.payload;
          })
          .addCase(fetchApplicationDetails.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? null;
          });
      },
})

export const {clearApplicationDetails, setError, setApplicationId, clearApplicationId} = applicationDetailsSlice.actions;
export default applicationDetailsSlice.reducer;