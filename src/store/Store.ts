import { configureStore } from '@reduxjs/toolkit';
import { ImageSlice } from './Image';
import { TimelineSlice } from './Timeline';

export const Store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    [ImageSlice.name]: ImageSlice.reducer,
    [TimelineSlice.name]: TimelineSlice.reducer,
  },
});

export type State = ReturnType<typeof Store.getState>;
export type Dispatch = typeof Store.dispatch;
