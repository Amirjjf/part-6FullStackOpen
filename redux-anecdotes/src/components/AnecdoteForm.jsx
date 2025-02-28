import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer.js';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = ''; // ✅ Clear input
    dispatch(createAnecdote(content)); // ✅ Dispatch new anecdote action
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
