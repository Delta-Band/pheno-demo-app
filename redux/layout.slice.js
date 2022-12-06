import { createSlice } from '@reduxjs/toolkit';

const initialState = { minimizeRibbon: false };

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setMinimizeRibbon(state, action) {
      state.minimizeRibbon = action.payload;
    }
  }
});

export default layoutSlice;
