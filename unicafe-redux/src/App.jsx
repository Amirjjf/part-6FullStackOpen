import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const { good, ok, bad } = useSelector(state => state.counter); // ✅ Select from state.counter

  return (
    <div>
      <h1>Unicafe Feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>OK</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>Reset</button>

      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>OK: {ok}</p>
      <p>Bad: {bad}</p>
    </div>
  );
};

export default App;
