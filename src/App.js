import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDerived, fetchDerived } from './slices/thunkSlice';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDerived());
  }, [dispatch])

  let derivedString;
  const derived = useSelector(selectDerived);
  if (derived) {
    derivedString = JSON.stringify(derived, 0, 2);
  }

  return (
    <div className="App">
    <h4>Derived</h4>
      <pre>{derivedString}</pre>
    </div>
  );
}

export default App;
