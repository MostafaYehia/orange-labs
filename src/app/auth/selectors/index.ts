import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

const authState = createFeatureSelector<AuthState>("auth");

// Get User Token
export const tokenState = createSelector(
  authState,
  (state: AuthState) => (state.user ? state.user.token : null)
);

// Logged in state
export const isLoggedInState = createSelector(
  authState,
  (state: AuthState) => !!state.user
);

// Get User Account verification state
export const isVerifiedState = createSelector(
  authState,
  (state: AuthState) => state.user && state.user.data["isVerified"]
);

// Get User Account verification state
export const showVerifyMessageState = createSelector(
  authState,
  isLoggedInState,
  (state: AuthState, loggedIn: Boolean) =>
    loggedIn && !state.user.data["isVerified"]
);

// Get Current User
export const getCurrentUser = createSelector(
  authState,
  (state: AuthState) => state.user.data
);

// Get Loading State
export const authLoading = createSelector(
  authState,
  (state: AuthState) => state.loading
);

// Authentication loading state
export const loginErrorState = createSelector(
  authState,
  (state: AuthState) => state.error.login
);
export const signupErrorState = createSelector(
  authState,
  (state: AuthState) => state.error.signup
);
