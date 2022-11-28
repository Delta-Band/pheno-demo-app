import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';

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

const folders = createSelector(
  [state => state.fields.fields, (state, args) => args],
  (fields, args) => {
    const filters =
      args.filter ||
      ''
        .split(',')
        .reduce((acc, fltr) => {
          const trimmed = fltr.trim();
          if (trimmed) {
            acc.push(trimmed);
          }
          return acc;
        }, [])
        .join('|');
    const filtersRegEx = new RegExp(filters, 'i');
    const foldersObject = fields.reduce((folders, field) => {
      if (field.name.toLowerCase().search(filtersRegEx) >= 0) {
        folders[field.originCategory] = {
          participants: folders[field.originCategory]?.participants
            ? folders[field.originCategory].participants + field.participants
            : field.participants,
          measurements: folders[field.originCategory]?.measurements
            ? folders[field.originCategory].measurements + field.measurements
            : field.measurements,
          cohorts: folders[field.originCategory]?.cohorts
            ? folders[field.originCategory].cohorts + field.cohorts
            : field.cohorts
        };
      }
      return folders;
    }, []);
    const foldersArray = [];
    Object.keys(foldersObject).forEach(key => {
      foldersArray.push({
        name: key,
        participants: foldersObject[key].participants,
        measurements: foldersObject[key].measurements,
        cohorts: foldersObject[key].cohorts
      });
    });
    const sorted = foldersArray.sort((a, b) => {
      switch (true) {
        case args.sorter === 'participants' && args.direction === 'asc':
          return a.participants - b.participants;
        case args.sorter === 'participants' && args.direction === 'desc':
          return b.participants - a.participants;
        case args.sorter === 'measurements' && args.direction === 'asc':
          return a.measurements - b.measurements;
        case args.sorter === 'measurements' && args.direction === 'desc':
          return b.measurements - a.measurements;
        case args.sorter === 'cohorts' && args.direction === 'asc':
          return a.cohorts - b.cohorts;
        case args.sorter === 'cohorts' && args.direction === 'desc':
          return b.cohorts - a.cohorts;
        default:
          return b.participants - a.participants;
      }
    });

    console.log('sorted', sorted);
    return sorted;
  }
);

fieldsSlice.selectors = {
  folders
};

Object.assign(fieldsSlice.actions, {
  setData
});

export default fieldsSlice;
