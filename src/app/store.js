import { configureStore } from '@reduxjs/toolkit';
import thunk from '../slices/thunkSlice';

export default configureStore({
  reducer: {
    thunk,
  },
});
