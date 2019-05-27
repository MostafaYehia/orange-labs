import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from '../reducers/auth.reducer';


const authState = createFeatureSelector<AuthState>('auth');


// Get User Token
export const token = createSelector(authState, (state: AuthState) => state.user.token)

// Authentication loading state
export const loading = createSelector(authState, (state: AuthState, props)=> state.loading);

