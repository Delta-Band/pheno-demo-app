import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import uniq from 'lodash/uniq';

const initialState = { working: true, fields: [] };

const setData = createAsyncThunk('fields/fetch', async () => {
  const resp = await fetch('/api/fields');
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
      case sorter === 'a-z' && direction === 'asc':
        return b.name < a.name ? 1 : -1;
      case sorter === 'a-z' && direction === 'desc':
        return b.name > a.name ? 1 : -1;
      default:
        return b.name - a.name;
    }
  });
}

const field = createSelector(
  [state => state.fields.fields, (state, id) => id],
  (fields, id) => {
    return fields.find(fld => fld.id === id);
  }
);

const fields = createSelector(
  [state => state.fields.fields, (state, args) => args],
  (fields, args) => {
    let filteredFields = fields;
    if (args.folderID) {
      filteredFields = filteredFields.reduce((acc, field) => {
        if (field.folderID === args.folderID) {
          acc.push(field);
        }
        return acc;
      }, []);
    }
    if (args.filter) {
      const filtersRegEx = filterToRegEx(decodeURIComponent(args.filter));
      filteredFields = filteredFields.reduce((acc, field) => {
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
  [
    (state, args) => state.folders.folders,
    (state, args) => fields(state, args),
    (state, args) => args
  ],
  (folders, fields, args) => {
    const foldersObject = fields.reduce((folders, field) => {
      folders[field.folderID] = {
        participants: folders[field.folderID]?.participants
          ? folders[field.folderID].participants + field.participants
          : field.participants,
        measurements: folders[field.folderID]?.measurements
          ? folders[field.folderID].measurements + field.measurements
          : field.measurements,
        cohorts: folders[field.folderID]?.cohorts
          ? uniq(folders[field.folderID].cohorts.concat(field.cohorts))
          : field.cohorts
      };
      return folders;
    }, {});
    const foldersArray = [];
    Object.keys(foldersObject).reduce((acc, key) => {
      const folder = folders.find(fldr => fldr.id === key);
      if (folder) {
        foldersArray.push({
          id: key,
          name: folder.name,
          participants: foldersObject[key].participants,
          measurements: foldersObject[key].measurements,
          cohorts: foldersObject[key].cohorts
        });
      }
      return acc;
    }, []);
    const sorted = sortEm(foldersArray, args.sorter, args.direction);
    return sorted;
  }
);

const totals = createSelector(
  [(state, args) => fields(state, args)],
  fields => {
    return fields.reduce(
      (acc, field) => {
        acc.participants = Math.max(acc.participants, field.participants);
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
  totals,
  field
};

Object.assign(fieldsSlice.actions, {
  setData
});

export default fieldsSlice;
