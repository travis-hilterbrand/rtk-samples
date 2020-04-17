import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDerived, fetchDerived, selectFetchingDerived, selectDerivedError } from './slices/thunkSlice';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDerived());
  }, [dispatch])

  const fetchingDerived = useSelector(selectFetchingDerived);
  const derivedError = useSelector(selectDerivedError);
  let derivedString;
  const derived = useSelector(selectDerived);
  if (derived) {
    derivedString = JSON.stringify(derived, 0, 2);
  }

  return (
    <div className="App">
    <div>
      <button onClick={() => dispatch(fetchDerived())}>Fetch</button>
      <button onClick={() => dispatch(fetchDerived({error: true}))}>Fetch w/ error</button>
    </div>
    <hr />
    <div>
      <h4>Derived</h4>
      {fetchingDerived &&
        <span> Fetching</span>
      }
      {derivedError &&
        <span> {derivedError}</span>
      }
    </div>
    <pre>{derivedString}</pre>
    </div>
  );
}

export default App;
