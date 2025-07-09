import useNotification from "../useNotification.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../services/requests.js";

const AnecdoteForm = () => {
  const { setNotificationWithTimeout } = useNotification();
  const queryClient = useQueryClient();

  const createAnecdoteMutation = useMutation({
    mutationFn: noteService.createNew,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      setNotificationWithTimeout(
        `You created: '${createdAnecdote.content}'`,
        5
      );
    },
    onError: (error) => {
      console.error("Error creating anecdote:", error);
      setNotificationWithTimeout("Failed to create anecdote", 5);
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    if (content.length < 5) {
      setNotificationWithTimeout(
        "Anecdote must be at least 5 characters long",
        5
      );
      return;
    }
    createAnecdoteMutation.mutate(content, {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
