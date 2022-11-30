import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';

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

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

function filterToRegEx(filter) {
  const filterSplit = filter.split(',');
  const regex = filterSplit.reduce((acc, itm, i) => {
    if (i === filterSplit.length - 1) {
      acc += `${escapeRegExp(itm)}`;
    } else {
      acc += `${escapeRegExp(itm)}|`;
    }
    return acc;
  }, '');
  return new RegExp(regex, 'gi');
}

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
      default:
        return b.participants - a.participants;
    }
  });
}

const fields = createSelector(
  [state => state.fields.fields, (state, args) => args],
  (fields, args) => {
    let filteredFields = fields;
    if (args.folder) {
      filteredFields = filteredFields.reduce((acc, field) => {
        if (
          field.originCategory.toLowerCase().replace(' ', '-') === args.folder
        ) {
          acc.push(field);
        }
        return acc;
      }, []);
    }
    if (args.filter) {
      const filtersRegEx = filterToRegEx(decodeURIComponent(args.filter));
      filteredFields = filteredFields.reduce((acc, field) => {
        debugger;
        if (field.name.search(filtersRegEx) >= 0) {
          acc.push(field);
        }
        return acc;
      }, []);
    }

    const sorted = sortEm(filteredFields, args.sorter, args.direction);

    return sorted;
  }
);

const folders = createSelector(
  [(state, args) => fields(state, args), (state, args) => args],
  (fields, args) => {
    const foldersObject = fields.reduce((folders, field) => {
      folders[field.originCategory] = {
        participants: folders[field.originCategory]?.participants
          ? folders[field.originCategory].participants + field.participants
          : field.participants,
        measurements: folders[field.originCategory]?.measurements
          ? folders[field.originCategory].measurements + field.measurements
          : field.measurements,
        cohorts: folders[field.originCategory]?.cohorts
          ? uniq(folders[field.originCategory].cohorts.concat(field.cohorts))
          : field.cohorts
      };
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

const totals = createSelector(
  [(state, args) => fields(state, args)],
  fields => {
    return fields.reduce(
      (acc, field) => {
        acc.participants += field.participants;
        acc.measurements += field.measurements;
        acc.cohorts = uniq(acc.cohorts.concat(field.cohorts));
        return acc;
      },
      {
        participants: 0,
        measurements: 0,
        cohorts: []
      }
    );
  }
);

fieldsSlice.selectors = {
  folders,
  fields,
  totals
};

Object.assign(fieldsSlice.actions, {
  setData
});

export default fieldsSlice;
