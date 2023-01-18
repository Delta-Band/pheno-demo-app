import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';

const initialState = { working: false, folders: [] };

const setData = createAsyncThunk(
  'folders/fetch',
  async ({ folderID, filter }) => {
    let folders = await fetch(
      `/api/folders?folderID=${folderID}&filter=${filter}`
    );
    folders = await folders.json();
    return folders;
  }
);

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {},
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

function sortEm(items, sorter, direction) {
  return [...items].sort((a, b) => {
    switch (true) {
      case sorter === 'participants' && direction === 'asc':
        return a.participants - b.participants;
      case sorter === 'participants' && direction === 'desc':
        return b.participants - a.participants;
      case sorter === 'measurements' && direction === 'asc':
        return a.measurements - b.measurements;
      case sorter === 'measurements' && direction === 'desc':
        return b.measurements - a.measurements;
      case sorter === 'cohorts' && direction === 'asc':
        return a.cohorts.length - b.cohorts.length;
      case sorter === 'cohorts' && direction === 'desc':
        return b.cohorts.length - a.cohorts.length;
      case sorter === 'a-z' && direction === 'asc':
        return b.name > a.name ? 1 : -1;
      case sorter === 'a-z' && direction === 'desc':
        return b.name < a.name ? 1 : -1;
      default:
        return b.name - a.name;
    }
  });
}

const folderById = createSelector(
  [(state, id) => state.folders.folders, (state, id) => id],
  (folders, id) => {
    return folders.find(fldr => fldr.id === id);
  }
);

const totals = createSelector([state => state.folders.folders], folders => {
  return folders.reduce(
    (acc, field) => {
      acc.participants = Math.max(acc.participants, field.participants || 0);
      acc.measurements += field.measurements || 0;
      acc.cohorts = uniq(acc.cohorts.concat(field.cohorts));
      return acc;
    },
    {
      participants: 0,
      measurements: 0,
      cohorts: []
    }
  );
});

const folders = createSelector(
  [(state, args) => state.folders.folders, (state, args) => args],
  (folders, args) => {
    const sorted = sortEm(folders, args.sorter, args.direction);
    return sorted;
  }
);

foldersSlice.selectors = {
  folders,
  folderById,
  totals
};

Object.assign(foldersSlice.actions, {
  setData
});

export default foldersSlice;
