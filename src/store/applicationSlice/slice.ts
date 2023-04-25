import { createSlice } from '@reduxjs/toolkit';

import { reducers } from './reducers';
import { initialState } from './state';

const slice = createSlice({
  name: 'application',
  initialState,
  reducers
});

export const {
  setIsConnected,
  setActiveAgents,
  addAgents,
  deteleAgents,
  setNumberOfAgents,
  setModelType
} = slice.actions;

const applicationSlice = slice.reducer;

export default applicationSlice;