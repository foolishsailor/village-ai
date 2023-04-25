/*

 Usage example:

 store.subscribe(() => {
  const {
    application: { openAIKey }
  } = store.getState();

  console.log(openAIKey);
});
*/

import { configureStore } from '@reduxjs/toolkit';

import applicationSlice from './applicationSlice/slice';

const store = configureStore({
  reducer: {
    application: applicationSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
