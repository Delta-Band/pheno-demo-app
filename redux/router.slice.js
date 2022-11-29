import { createSlice } from '@reduxjs/toolkit';

const initialState = { prevRoute: null };

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setPrevRoute(state, action) {
      state.prevRoute = action.payload;
    }
  }
});

export default routerSlice;
