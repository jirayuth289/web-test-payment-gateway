import { configureStore } from '@reduxjs/toolkit';
import { carReducer } from '@/features/car-management/store';

/**
 * Root Redux store configuration
 */
export const store = configureStore({
  reducer: {
    car: carReducer,
    // Add other feature reducers here
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export hooks
export * from './hooks';
