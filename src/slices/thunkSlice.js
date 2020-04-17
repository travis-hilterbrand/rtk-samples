import _ from 'lodash';
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

const sliceName = 'thunk';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function fetchDerivedResource() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [];
      for (let i = 1; i < 10; i++) {
        data.push({
          id: 'id-' + i,
          label: 'Item ' + i
        });
      }
      resolve(data);
    }, 1000);
  });
}

export const fetchDerived = createAsyncThunk(sliceName + '/fetchDerived',
  async ({error = false} = {}, thunkAPI) => {
    console.info('fetchDerived');
    await sleep(250);
    if (error) {
      throw new Error('Unable to load');
    }
    else {
      const derived = await fetchDerivedResource();
      return derived;
    }
  }
);
export const slice = createSlice({
  name: sliceName,
  initialState: {
    fetchingDerived: false,
    derivedError: null,
    derived: [],
  },
  reducers: {
  },
  extraReducers: {
    [fetchDerived.pending]: (state, action) => {
      state.fetchingDerived = true;
      state.derivedError = '';
      state.derived = [];
    },
    [fetchDerived.rejected]: (state, action) => {
      state.fetchingDerived = false;
      state.derivedError = action.error.message;
      state.derived = [];
    },
    [fetchDerived.fulfilled]: (state, action) => {
      state.fetchingDerived = false;
      state.derivedError = '';
      state.derived = action.payload;
    },
  },
});

export const selectFetchingDerived = state => state.thunk.fetchingDerived;
export const selectDerivedError = state => state.thunk.derivedError;
const selectDerivedInternal = state => state.thunk.derived;
export const selectDerived = createSelector(selectDerivedInternal, (derived) => {
  const ret = _.cloneDeep(derived);
  return ret.reverse();
});

export default slice.reducer;
