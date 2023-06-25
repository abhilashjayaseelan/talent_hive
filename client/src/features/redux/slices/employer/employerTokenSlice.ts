import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface TokenState {
  employerToken: string | null;
}

const loadTokenFromLocalStorage = (): string | null => {
  try {
    const token = localStorage.getItem('EmployerToken');
    return token ? token : null;
  } catch (error) {
    console.log('Error loading token from local storage:', error);
    return null;
  }
};

const initialState: TokenState = {
  employerToken: loadTokenFromLocalStorage(),
};

const employerTokenSlice = createSlice({
  name: 'employerToken',
  initialState,
  reducers: {
    setEmployerToken: (state, action: PayloadAction<string>) => {
      state.employerToken = action.payload;
      try {
        localStorage.setItem('EmployerToken', action.payload);
      } catch (error) {
        console.log('Error storing token in local storage:', error);
      }
    },
    clearEmployerToken: (state) => {
      state.employerToken = null;
      try {
        localStorage.removeItem('EmployerToken');
      } catch (error) {
        console.log('Error removing token from local storage:', error);
      }
    },
  },
});

export const { setEmployerToken, clearEmployerToken } = employerTokenSlice.actions;
export default employerTokenSlice.reducer;
