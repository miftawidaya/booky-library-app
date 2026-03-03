import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthConfig = createSelector(
  [selectAuth, selectIsAuthenticated, selectUser],
  (auth, isAuthenticated, user) => ({
    auth,
    isAuthenticated,
    user,
  })
);
