import { useSelector } from "react-redux";
import useNotification from "../useNotification.js";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../services/requests.js";

const AnecdoteList = ({ anecdotes }) => {
  const filter = useSelector((state) => state.filter);
  const { setNotificationWithTimeout } = useNotification();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: noteService.updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      setNotificationWithTimeout(`you voted '${updatedAnecdote.content}'`, 5);
    },
    onError: (error) => {
      console.error("Error voting anecdote:", error);
      setNotificationWithTimeout("Failed to vote for anecdote", 5);
    },
  });

  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    const anecdote = filteredAnecdotes.find((a) => a.id === id);
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
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

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default AnecdoteList;
