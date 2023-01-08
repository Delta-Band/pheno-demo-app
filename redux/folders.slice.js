import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';

const initialState = { working: true, folders: [] };

const setData = createAsyncThunk('folders/fetch', async filter => {
  let folders = await fetch(`/api/folders?filter=${filter}`);
  folders = await folders.json();
  console.log('folders', folders);
  return folders;
});

const foldersSlice = createSlice({
  name: 'folders',
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
        state.folders = action.payload;
        state.working = false;
      });
  }
});

const folderById = createSelector(
  [(state, id) => state.folders.folders, (state, id) => id],
  (folders, id) => folders.find(fldr => fldr.id === id)
);

foldersSlice.selectors = {
  folderById
};

Object.assign(foldersSlice.actions, {
  setData
});

export default foldersSlice;
