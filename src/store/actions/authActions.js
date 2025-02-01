import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, setUser, resetAuth } from '@store/slices/authSlice';
import { authService } from '@api/auth.service';

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const { provider } = getState().auth; // Get provider from state
    const user = await authService.login(email, password, provider);
    if (user) {
      dispatch(setUser(user));
      return user;
    }
  } catch (error) {
    const errorMessage = error.message || 'Login failed. Please try again.';
    dispatch(setError(errorMessage));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const signupUser = (email, password, provider) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await authService.signup(email, password, provider);
    dispatch(setUser(user));
    return user;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await authService.logout();
    dispatch(resetAuth());
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await authService.getCurrentUser();
    dispatch(setUser(user));
    return user;
  } catch (error) {
    dispatch(resetAuth());
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginWithGoogle = (provider) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await authService.loginWithGoogle(provider);
    dispatch(setUser(user));
    return user;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const sendVerificationEmail = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await authService.sendVerificationEmail();
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await authService.resetPassword(email);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await authService.deleteAccount();
      dispatch(resetAuth());
      return true;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const softDeleteAccount = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await authService.softDeleteAccount();
    dispatch(logout());
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const exportUserData = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userData = await authService.exportUserData();
    dispatch(setLoading(false));
    return userData;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const loginWithGithub = (provider) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await authService.loginWithGithub(provider);
    if (user) {
      dispatch(setUser(user));
      return user;
    }
  } catch (error) {
    const errorMessage = error.message || 'GitHub login failed. Please try again.';
    dispatch(setError(errorMessage));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
}; 