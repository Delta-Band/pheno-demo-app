import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';

const initialState = { working: false, field: null };

const setData = createAsyncThunk('singleField/fetch', async fieldID => {
  const resp = await fetch(`/api/singleField?fieldID=${fieldID}`);
  const data = await resp.json();
  return data;
});

const singleFieldSlice = createSlice({
  name: 'singleField',
  initialState,
  reducers: {
    // logout(state, action) {
    //   window.localStorage.removeItem('auth');
    //   state.auth = null;
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(setData.pending, state => {
        state.working = true;
      })
      .addCase(setData.fulfilled, (state, action) => {
        state.field = action.payload;
        state.working = false;
      });
  }
});

const distributionStats = createSelector(
  [(state, args) => field(state, args.filedID), (state, args) => args],
  (filed, { selectedCohort, selectedInstance }) => {
    if (!selectedCohort || !selectedInstance) return null;
    return filed.distributionStats.find(
      stats =>
        stats.cohort === selectedCohort && stats.instance === selectedInstance
    );
  }
);

singleFieldSlice.selectors = {
  distributionStats
};

Object.assign(singleFieldSlice.actions, {
  setData
});

export default singleFieldSlice;
