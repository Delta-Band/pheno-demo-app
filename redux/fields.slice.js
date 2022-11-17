import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = { working: true, fields: [] };

const setData = createAsyncThunk('fields/fetch', async () => {
  const resp = await fetch('/api');
  const data = resp.json();
  return data;
});

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    // logout(state, action) {
    //   window.localStorage.removeItem('auth');
    //   state.auth = null;
    // }
  },
  extraReducers: builder => {
    builder
      // .addCase(fetch.pending, state => {
      //   state.working = true;
      // })
      .addCase(setData.fulfilled, (state, action) => {
        state.fields = action.payload;
        state.working = false;
      });
  }
});

Object.assign(fieldsSlice.actions, {
  setData
});

export default fieldsSlice;
