import { configureStore } from '@reduxjs/toolkit';
import fieldsSlice from './fields.slice';
import routerSlice from './router.slice';

const store = configureStore({
  reducer: {
    fields: fieldsSlice.reducer,
    router: routerSlice.reducer
  }
});

export default store;
