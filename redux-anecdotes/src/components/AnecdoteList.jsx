import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer.js';
import { setNotificationAsync } from '../reducers/notificationReducer.js';

const AnecdoteList = () => {

  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id);
    dispatch(voteAnecdoteAsync(anecdote));
    dispatch(setNotificationAsync(`you voted '${anecdote.content}'`, 5))
  };

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
