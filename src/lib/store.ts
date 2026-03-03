import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import feature slices (feature-first)
import { authSlice } from '@/features/auth/store';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth for now
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools:
    process.env.NODE_ENV === 'production'
      ? false
      : {
          trace: true,
          traceLimit: 25,
          actionsDenylist: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
