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

function filterToRegEx(filter) {
  return new RegExp(
    filter ||
      ''
        .split(',')
        .reduce((acc, fltr) => {
          const trimmed = fltr.trim();
          if (trimmed) {
            acc.push(trimmed);
          }
          return acc;
        }, [])
        .join('|'),
    'i'
  );
}

function sortEm(items, sorter, direction) {
  return items.sort((a, b) => {
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
        return a.cohorts - b.cohorts;
      case sorter === 'cohorts' && direction === 'desc':
        return b.cohorts - a.cohorts;
      default:
        return b.participants - a.participants;
    }
  });
}

const folders = createSelector(
  [state => state.fields.fields, (state, args) => args],
  (fields, args) => {
    const filtersRegEx = filterToRegEx(args.filter);
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
    }, {});
    const foldersArray = [];
    Object.keys(foldersObject).forEach(key => {
      foldersArray.push({
        name: key,
        participants: foldersObject[key].participants,
        measurements: foldersObject[key].measurements,
        cohorts: foldersObject[key].cohorts
      });
    });
    const sorted = sortEm(foldersArray, args.sorter, args.direction);
    return sorted;
  }
);

const fields = createSelector(
  [state => state.fields.fields, (state, args) => args],
  (fields, args) => {
    const filtersRegEx = filterToRegEx(args.filter);

    const filtered = fields.reduce((acc, field) => {
      if (
        field.name.search(filtersRegEx) >= 0 &&
        field.originCategory.toLowerCase().replace(' ', '-') === args.folder
      ) {
        acc.push(field);
      }
      return acc;
    }, []);

    const sorted = sortEm(filtered, args.sorter, args.direction);

    return sorted;
  }
);

fieldsSlice.selectors = {
  folders,
  fields
};

Object.assign(fieldsSlice.actions, {
  setData
});

export default fieldsSlice;
