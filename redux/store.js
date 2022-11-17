import { configureStore } from '@reduxjs/toolkit';
import fieldsSlice from './fields.slice';

const store = configureStore({
  reducer: {
    fields: fieldsSlice.reducer
  }
});

export default store;
