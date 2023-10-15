import { configureStore } from '@reduxjs/toolkit';
import { PictureSlice } from './PictureSlice';
import { TimelineSlice } from './TimelineSlice';

export const Store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    [PictureSlice.name]: PictureSlice.reducer,
    [TimelineSlice.name]: TimelineSlice.reducer,
  },
});

export type State = ReturnType<typeof Store.getState>;
export type Dispatch = typeof Store.dispatch;
