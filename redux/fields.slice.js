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
  state => state.fields.fields,
  fields => {
    const foldersObject = fields.reduce((folders, field) => {
      field.location.forEach(location => {
        folders[location] = {
          participants: folders[location]?.participants
            ? folders[location].participants + field.participants
            : field.participants
        };
      });
      return folders;
    }, []);
    const foldersArray = [];
    Object.keys(foldersObject).forEach(key => {
      foldersArray.push({
        name: key,
        participants: foldersObject[key].participants
      });
    });
    return foldersArray;
  }
);

fieldsSlice.selectors = {
  folders
};

Object.assign(fieldsSlice.actions, {
  setData
});

export default fieldsSlice;
