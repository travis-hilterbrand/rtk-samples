import { createSlice, createSelector } from '@reduxjs/toolkit';

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

export const slice = createSlice({
  name: 'thunk',
  initialState: {
    derived: [],
  },
  reducers: {
    fetchDerivedSuccess(state, action) {
      state.derived = action.payload.items;
    },
  }
});
export const { fetchDerivedSuccess } = slice.actions;

export const selectDerived = state => state.thunk.derived;

export const fetchDerived = () => async dispatch => {
  try {
    await sleep(250);
    const derived = await fetchDerivedResource();
    dispatch(fetchDerivedSuccess({items: derived}));
  }
  catch (err) {
    //dispatch(getIssuesFailure(err.toString()))
  }
}

export default slice.reducer;
