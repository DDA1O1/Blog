import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, setUser, resetAuth } from '@store/slices/authSlice';
import { authService } from '@api/auth.service';
import AuthProvider from '@services/lib/auth';

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const { provider } = getState().auth;
    const authProvider = new AuthProvider(provider);
    const user = await authProvider.login(email, password);
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

// Redux automatically injects dispatch and getState
export const signupUser = (email, password) => async (dispatch, getState) => {
  // You can use dispatch here without importing useDispatch
  const provider = getState().auth.provider;
  const authProvider = new AuthProvider(provider);
  
  try {
    const user = await authProvider.signup(email, password);
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