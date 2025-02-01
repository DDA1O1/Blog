import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  provider: localStorage.getItem('dbProvider') || 'firebase',
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload === false) {
        state.error = null;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
      localStorage.setItem('dbProvider', action.payload);
    },
    resetAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setLoading, setError, setUser, setProvider, resetAuth } = authSlice.actions;
export default authSlice.reducer; 